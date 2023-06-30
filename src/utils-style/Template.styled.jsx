import styled from '@emotion/styled';

export const Button = styled.button`
  cursor: pointer;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.buttonBgColor};
  border-color: ${props => props.theme.colors.buttonBorderColor};
  transition: background-color
      ${props => props.theme.animation.durationAndTimingFunction},
    border-color ${props => props.theme.animation.durationAndTimingFunction};

  &:hover,
  &:focus {
    background-color: ${props => props.theme.colors.accent};
    border-color: ${props => props.theme.colors.accent};
  }
`;
