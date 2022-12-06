import React from  'react'
import styled from 'styled-components'
import MovieComponent from './components/MovieComponent';
import axios from 'axios';
import MovieInfoComponent from './components/MovieInfoComponent';

// const API_KEY = " 7b1eaff6";
export const API_KEY = "a9118a3a";

const Container =styled.div`
display: flex;
flex-direction:column;
background-image: linear-gradient(180deg, purple, white);
// background-image: radial-gradient(circle, purple, white, grey);
`;

const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
background-image: linear-gradient(180deg, purple, red);
background-color:purple;
color:white;
align-items:center;
padding:10px;
font-size:25px;
font-weight:bold;
box-shadow: 0 3px 6px 0 #555`;


const AppName = styled.div`
display:flex;
flex-direction: row;
align-items:center;
`;

const MovieImage = styled.img`
width: 40px;
height:40px;
margin:15px;
`;

const SearchBox = styled.div`
display:flex;
flex-direction: row
padding: 10px 10px;
background-color: white;
border-radius:6px;
margin-left:20px;
width:50%;
background-color: white;
align-items:center;
`;


const SearchIcon = styled.img`
width:32px;
height:32px;`;

const SearchInput = styled.input`
color: black;
font-family:'sans-serif';
font-size: 16px;
font-weight: bold;
border: none;
outline: none;
margin-left: 15px;
`;

const MovieListContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 30px;
gap: 24px;
justify-content:space-evenly; `;


const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App(){
  const [searchQuery, updateSearchQuery]= React.useState("");
  const[timeoutId, updateTimeoutId] = React.useState();
  const [ movieList, updateMovieList] = React.useState([]);
  const [selectedMovie, onMovieSelect] = React.useState();

  const fetchData = async (searchString)=>{
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
      );
  updateMovieList(response.data.Search)
  };
  const onTextChange =(event)=>{
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(()=>fetchData(event.target.value),500)
    updateTimeoutId(timeout);
  }
  return (<Container>
    <Header>
      <AppName>
        <MovieImage src={require('./movie-icon.png')}/>
        React Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src={require('./search-icon.png')}/>
          <SearchInput 
          placeholder='Search Movie' 
          value={searchQuery}
          onChange={onTextChange}/>
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length
        ? movieList.map((movie , index)=> <MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect}/>)
        : <Placeholder src={require('./movie-icon.png')} />
      }
      
      </MovieListContainer>
  </Container>);
}

export default App;