import styled from "styled-components";
import Button from "../UI/Button";

const listedGenres = ["all", "drama", "romance", "war", "thriller"];

export default function MoviesGenres({ onClickHandler, activeGenre }) {
  return (
    <FiltersStyled>
      {listedGenres.map((genre) => {
        return (
          <Button
            mode="filter"
            key={genre}
            onClickHandler={() => {
              onClickHandler(genre);
            }}
            buttonName={genre}
            active={activeGenre === genre}
          />
        );
      })}
    </FiltersStyled>
  );
}

const FiltersStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;
