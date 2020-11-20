import styled from 'styled-components';

export const ProductWrapper = styled.div`
   display: flex;


   .button-return {
       padding: 25px 0px 0px 50px;
   }
   .productView {
       padding: 50px;
       h1 {
           font-size: 24px;
           font-family: Arial, Helvetica, sans-serif;
           margin-bottom: 20px;
       }
       p {
           font-size: 18px;

           &:nth-child(1n+2) {
               padding-top: 10px;
               font-family: Arial, Helvetica, sans-serif;
           }
       }
       img {
           width: 120px;
       }

       button {
            margin-top: 20px;
       }
   }
`;