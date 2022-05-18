import styled from "styled-components";

export default function Checkbox({
  name,
  label,
  onChangeHandler,
  value,
  isTouched,
  optional,
  error,
  wasSubmitted,
}) {
  const showError = (isTouched || wasSubmitted === "submitted") && !optional && error;
  return (
    <CheckBox>
      <LabelField>
        {label}
        <InputField
          type="checkbox"
          name={name}
          checked={value}
          onChange={onChangeHandler}
          showError={showError}
        />
        <Span showError={showError} />
      </LabelField>
      <ErrorMessage>{showError ? error : ""}</ErrorMessage>
    </CheckBox>
  );
}

const CheckBox = styled.div`
  font-family: var(--inter);
  font-size: 1.4rem;
  color: var(--black);
  font-weight: 600;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
const LabelField = styled.label`
  display: block;
  position: relative;
  cursor: pointer;
  padding-left: 2.2rem;
`;
const InputField = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  &:checked ~ span:after {
    opacity: 1;
  }
  &:checked ~ span {
    background-color: var(--gold);
  }
`;
const Span = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 1.65rem;
  width: 1.65rem;
  background-color: ${({ showError }) => (showError ? "#CCBABA" : "#CCCCCC")};
  border-radius: 2px;
  transition: background-color 0.25s cubic-bezier(0.2, 0, 0.2, 1);
  &:after {
    opacity: 0;
  }
  &:after {
    left: 6px;
    top: 2px;
    width: 4px;
    height: 8px;
    border: solid var(--white);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;
const ErrorMessage = styled.span`
  flex: 1 1 100%;
  color: var(--red);
  font-size: 1.4rem;
  font-weight: 500;
  min-height: 1.8rem;
  margin-top: 0.6rem;
  @media (min-width: 480px) {
    font-size: 1.5rem;
    min-height: 2rem;
  }
`;