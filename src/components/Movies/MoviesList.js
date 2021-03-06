import Link from "next/link";
import { dateConverter } from "../../utils/dateConverter";
import Message from "../UI/Message";
import { directorsFormatter } from "../../utils/directorsFormatter";
import MoviesImage from "./MoviesImage";
import styled from "styled-components";

export default function MoviesList({ moviesData, activeGenre, activeSearch }) {
  const dataLength = moviesData?.length === 0;
  if (activeGenre === "all" && !activeSearch && dataLength)
    return <Message message="Unfortunately there are no movies." />;
  if (!activeSearch && dataLength)
    return (
      <Message message={`Unfortunately there are no ${activeGenre} movies.`} />
    );
  if (activeSearch && dataLength)
    return <Message message="No results found." />;
  return (
    <WrapperStyled>
      {moviesData?.map((movie, i) => {
        return (
          <Link
            key={movie.id}
            href={`/movies/${movie.attributes.slug}`}
            passHref
          >
            <LinkStyled>
              <CardStyled>
                <MoviesImage
                  image={movie.attributes.image.data.attributes.url}
                  index={i}
                />
                <ContentStyled className="spacer">
                  <TextContent>
                    <HeadingStyled>{movie.attributes.title}</HeadingStyled>
                    <TextStyled>{movie.attributes.description}</TextStyled>
                  </TextContent>
                  <InfoContentStyled>
                    <p>{dateConverter(movie.attributes.createdAt)}</p>
                    <p>{`By ${directorsFormatter(
                      movie.attributes.directors.data
                    )}`}</p>
                  </InfoContentStyled>
                </ContentStyled>
              </CardStyled>
            </LinkStyled>
          </Link>
        );
      })}
    </WrapperStyled>
  );
}

const WrapperStyled = styled.div`
  margin-top: 6rem;
  @media (min-width: 900px) {
    display: grid;
    grid-gap: 3rem;
    grid-template-columns: repeat(auto-fill, minmax(38rem, 1fr));
  }
  @media (min-width: 1600px) {
    grid-template-columns: repeat(auto-fill, minmax(45rem, 1fr));
    gap: 4rem;
  }
`;
const LinkStyled = styled.a`
  & + & {
    display: block;
    margin-top: 6rem;
  }
  @media (min-width: 768px) {
    img {
      transition: all 0.5s cubic-bezier(0.2, 0, 0.2, 1);
    }
    &:hover img {
      transform: scale(1.04);
      filter: brightness(80%);
    }
    &:hover h1 {
      color: var(--gold);
    }
  }
  @media (min-width: 900px) {
    & + & {
      margin-top: 0;
    }
  }
`;
const CardStyled = styled.div`
  background-color: var(--white);
  width: calc(100% + 6.4rem);
  margin-left: -3.2rem;
  padding-bottom: 3rem;
  @media (min-width: 768px) {
    width: calc(100% + 8.4rem);
    margin-left: -4.2rem;
  }
  @media (min-width: 900px) {
    width: 100%;
    margin-left: 0;
    /* flex: 1 1 40rem; */
  }
`;
const ContentStyled = styled.div`
  @media (min-width: 900px) {
    min-height: 28rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &.spacer {
      width: unset;
      padding: 0 3rem 0 3rem;
    }
  }
  @media (min-width: 1600px) {
    &.spacer {
      padding: 0 3.2rem 0 3.2rem;
    }
  }
`;
const TextContent = styled.div``;
const HeadingStyled = styled.h1`
  font: 300 2.6rem var(--le);
  margin: 1.5rem 0 1.5rem 0;
  transition: color 0.4s cubic-bezier(0.2, 0, 0.2, 1);
`;
const TextStyled = styled.p`
  font: 300 1.8rem/1.4 var(--le);
  letter-spacing: 0.2px;
  color: #2b2b2b;
`;
const InfoContentStyled = styled.div`
  font: 600 1.2rem var(--inter);
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
  p:first-of-type {
    text-transform: uppercase;
    color: var(--grey);
  }
  p:last-of-type {
    color: var(--gold);
  }
  @media (min-width: 1600px) {
    font-size: 1.3rem;
  }
`;
