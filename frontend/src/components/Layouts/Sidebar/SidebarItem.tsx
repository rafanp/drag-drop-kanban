import { Typography } from '@mui/material';
import styled from '@emotion/styled';

const SiderbarItem = ({ title, children, active }: any) => {
  return (
    <StyledButton active={active}>
      {children}
      <Typography fontWeight={500}>{title}</Typography>
    </StyledButton>
  );
};

export default SiderbarItem;

interface Props {
  active: boolean;
}

const StyledButton = styled.div<Props>`
  display: flex;
  height: 40px;
  gap: 8px;
  align-items: center;
  border-radius: 8px;
  padding-left: 8px;
  cursor: pointer;
  color: gray;

  background-color: ${(props) => props.active && '#F5F7FB'};
  &:hover {
    background-color: #f5f7fb;
    transition: 1s;
  }

  svg {
    color: ${(props) => (props.active ? '#562BF7' : 'gray')};
  }
`;
