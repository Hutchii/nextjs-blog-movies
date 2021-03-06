import styled from "styled-components";
export default function Error({ statusCode }) {
  return (
    <main className="spacer center">
      <Wrapper>
        <ErrorWrapper>
          <ItalicStyled>{statusCode}:</ItalicStyled>{" "}
          {statusCode === "500"
            ? `An error occurred on server`
            : "An error occurred on client"}
        </ErrorWrapper>
      </Wrapper>
    </main>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
`;
const ErrorWrapper = styled.p`
  font-size: 1.8rem;
  font-family: var(--inter);
  font-weight: 600;
  text-transform: uppercase;
`;
const ItalicStyled = styled.span`
  color: var(--gold);
  font-style: italic;
  font-weight: 500;
  font-size: 3.6rem;
  margin-right: 1rem;
`;
