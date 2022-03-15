import { useQuery, useLazyQuery, NetworkStatus } from "@apollo/client";
import { MOVIES_FILTERS } from "../../libs/apolloQueries";
import AllPostGenres from "./AllPostsGenres";
import { useState, useEffect, useRef, useMemo } from "react";
import { debounce } from "lodash";
import AllPostsList from "./AllPostsList";
import AllPostsSearch from "./AllPostsSearch";
import AllPostsButton from "./AllPostsButton";

const listedGenres = ["all", "drama", "romance", "war", "thriller"];

export default function AllPosts() {
  const [activeGenre, setActiveGenre] = useState("all");
  const searchInput = useRef("");
  const { loading, error, data, fetchMore, refetch } = useQuery(
    MOVIES_FILTERS,
    {
      variables: {
        start: 0,
        limit: 6,
        genre: "all",
        title: "",
      },
      notifyOnNetworkStatusChange: true,
    }
  );
  const cacheData = data?.movies.data;
  const dataLength = data?.movies?.data.length;
  const totalLength = data?.movies?.meta.pagination.total;
  const areMorePosts = dataLength >= totalLength;
  const refetchHelper = (genre, title) =>
    refetch({
      start: 0,
      limit: 6,
      genre: genre,
      title: title,
    });
  const searchHandler = (event) => {
    setActiveGenre("");
    const search = event.target.value;
    refetchHelper("all", search);
  };
  const debouncedSearchHandler = useMemo(
    () => debounce(searchHandler, 300),
    [activeGenre]
  );
  return (
    <section className="posts spacer">
      <div className="posts-menu margin--top">
        <AllPostGenres
          onClickHandler={(currentGenre) => {
            searchInput.current.value = "";
            refetchHelper(currentGenre, "");
          }}
          onClickStateHandler={(activeGenre) => setActiveGenre(activeGenre)}
          activeGenre={activeGenre}
          listedGenres={listedGenres}
        />
        <AllPostsSearch
          refHandler={searchInput}
          onChangeHandler={debouncedSearchHandler}
          activeGenre={activeGenre}
        />
      </div>
      <p className="text--14 posts-results">
        {totalLength} <span className="color--grey">results</span>
      </p>
      <AllPostsList cacheData={cacheData} />
      {!areMorePosts && (
        <AllPostsButton
          onClickHandler={() =>
            fetchMore({
              variables: {
                start: 0,
                limit: dataLength + 6,
              },
            })
          }
          areMorePosts={areMorePosts}
        />
      )}
    </section>
  );
}