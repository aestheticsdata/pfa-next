import { css } from 'styled-components';

const header = css`
  width: 80%;
  font-weight: 800;
  margin: 10px auto;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(110,110,110);
  font-size: 13px;
  text-transform: uppercase;
  .date {
    font-weight: initial;
    .year {
      display: inline-block;
      margin-left: 4px;
    }
  }
`;

export default header;
