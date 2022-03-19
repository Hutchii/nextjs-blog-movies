import Link from "next/link";
import Image from "next/image";
import { imageUrlBuilder } from "../../libs/imageUrlBuilder";
import { dateConverter } from "../../libs/dateConverter";
import Message from "../UI/Message";
import { directorsFormatter } from "../../libs/directorsFormatter";

export default function AllPostsList({ moviesData, activeGenre, error }) {
  if (moviesData.length === 0)
    return <Message activeGenre={activeGenre} empty />;
  if (error) return <Message activeGenre={activeGenre} />;
  return (
    <>
      <div className="posts-cards">
        {moviesData?.map((movie) => {
          return (
            <Link key={movie.id} href={`/${movie.attributes.slug}`}>
              <a className="posts-cards--link">
                <div className="posts-cards--post">
                  <div className="posts-cards--image">
                    <Image
                      src={imageUrlBuilder(
                        movie.attributes.image.data.attributes.url
                      )}
                      alt="Movie"
                      width={1024}
                      height={600}
                      priority
                      unoptimized
                    />
                  </div>
                  <div className="posts-cards--text spacer">
                    <div className="posts-cards--content">
                      <h1 className="heading--26">{movie.attributes.title}</h1>
                      <p className="paragraph--18">
                        {movie.attributes.description}
                      </p>
                    </div>
                    <div className="posts-cards--info">
                      <p className="text--12 color--grey">
                        {dateConverter(movie.attributes.createdAt)}
                      </p>
                      <p className="text--12 color--gold">{`By ${directorsFormatter(
                        movie.attributes.directors.data
                      )}`}</p>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </>
  );
}