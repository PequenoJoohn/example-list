import styled from 'styled-components';

export const ProductWrapper = styled.div`
   
   ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        justify-items:center;
        align-items: center;

        li {
            display: grid;
            grid-template-rows: 200px 0px 50px 10px;
            align-items: center;
            justify-items:center;
            /* background: #022; */
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 300px;
            height: 300px;
            margin: 10px;
            text-align: center;
            font-family: 'Rubik-Bold', sans-serif;


            img {
                width: 100px;
               background-size: cover;
           }
       }
   }
`;