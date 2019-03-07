import React, {Component} from 'react';
 import albumData from './../data/albums';
  import { Link } from 'react-router-dom';

class Library extends Component{
  constructor(props){
    super(props);
    //in the statement below, we are assigning all of the albumData to albums.

    this.state={albums:albumData};


  }
  render(){
    return(
      <section className='library'>
      {
      //album is each element of the albums array.index is the index of the array. The albumand index are variables here,if you call them a and b, it would
      //work just fine.index is not a keyword.
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
