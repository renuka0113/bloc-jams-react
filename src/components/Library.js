import React, {Component} from 'react';
 import albumData from './../data/albums';
  import { Link } from 'react-router-dom';
  import './Library.css';

class Library extends Component{
  constructor(props){
    super(props);
    {/*in the statement below, we are assigning all of the albumData to albums.*/}
    this.state={albums:albumData};
  }

  render(){
    return(
      <section className='library'>
      {
      this.state.albums.map( (album, index) =>
       <Link to={`/album/${album.slug}`} key={index}>
        <img src={album.albumCover} alt={album.title} />
             <div>{album.title}</div>
             <div>{album.artist}</div>
             <div>{album.songs.length} songs</div>

      </Link>
      )
    }
      </section>
    );
  }
}
export default Library;
