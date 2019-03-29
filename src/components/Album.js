import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);
    {/* Now we want to set album property on our state.*/}
    {/* First we need to find the album object in albumData which has the slug property equal to
      this.props.match.params.slug*/}
      {/*Here, we are find that album object from albumData using .find(), whose slug property will equal
        this.props.match.params.slug */}

        const album = albumData.find( album => {
          return album.slug === this.props.match.params.slug
        });

        {/*Here we set the property of the state */}
        this.state = {
          album: album,
          currentSong: album.songs[0],
          isPlaying: false,
          hoveredSong:null,
          currentTime: 0,
          duration: album.songs[0].duration,
          currentVolume:0
        };
        this.audioElement = document.createElement('audio');{/*creating a new audio element */}
        this.audioElement.src = album.songs[0].audioSrc;{/*set the src property of this.audioElement to the audio source of the first song on the album;because we expect the playback to start with the first song of the album*/}
      }

      play() {
        this.audioElement.play();
        this.setState({ isPlaying: true });
      }

      pause() {
        this.audioElement.pause();
        this.setState({ isPlaying: false });
      }

      componentDidMount() {
        this.eventListeners = {
          timeupdate: e => {
            this.setState({ currentTime: this.audioElement.currentTime });
          },
          durationchange: e => {
            this.setState({ duration: this.audioElement.duration });
          },

        volumeupdate:e=>{
          this.setState({currentVolume:this.audioElement.currentVolume});
        }
        };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.addEventListener('volumeupdate', this.eventListeners.volumeupdate);

      }

      componentWillUnmount() {
      this.audioElement.src = null;
      this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
      this.audioElement.removeEventListener('volumeupdate',this.eventListeners.volumeupdate);
       }

      setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song });
      }

      handleSongClick(song) {
        const isSameSong = this.state.currentSong === song;
        if (this.state.isPlaying && isSameSong) {
          this.pause();

        } else {
          if (!isSameSong) { this.setSong(song); }
          this.play();
        }
      }

      handleMouseEnter(index){
        this.setState({hoveredSong:index});
      }

      handleMouseLeave(){
        this.setState({hoveredSong:null});
      }

      renderIcon(index){
        let isCurrentSong = this.state.album.songs.indexOf(this.state.currentSong)===index;
        if(isCurrentSong && !this.state.isPlaying){
          return <td><span className="ion-play"><i className="ion-md-play"></i></span></td>
        }
        if(this.state.hoveredSong===index){
          return <td><span className="ion-play"><i className="ion-md-play"></i></span></td>
        }else if(this.state.hoveredSong==null && this.state.isPlaying && isCurrentSong){
          return  <td><span className="ion-pause"><i className="ion-md-pause"></i></span></td>
        }else{
          return <td>{index+1}</td>
        }
      }

      handlePrevClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
      }

      handleNextClick(){
        const presentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const noOfSongs = this.state.album.songs.length;
        const nextIndex = presentIndex+1;
        if(nextIndex === noOfSongs){
        var newNextIndex = presentIndex;
        }else{
        newNextIndex = Math.min(noOfSongs,nextIndex);
        }
        const newNextSong = this.state.album.songs[newNextIndex];
        this.setSong(newNextSong);
        this.play();
      }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  formatTime(seconds){
    var mins;
    var sec;
    var minsString;
    var secString;
    var completedTimeString;
    if(isNaN(seconds)){  {/*if time is invalid or not a number then return -:--*/}
      return completedTimeString="-:--";
    } else if(seconds>60){  {/*here we check if the seconds input argument is greater than 60m if it is, we want to get it in minutes:seconds format*/}
      mins=Math.trunc(seconds/60); {/* the quotient will fetch the minutes part */}
      sec=Math.trunc(seconds%60); {/*the remainder will fetch the seconds part*/}
    }else if(seconds<=60){    {/*if the input argument itself is say 45 seconds,then there is no need to calculate, just display 0:45 */}
      mins=0;
      sec=Math.trunc(seconds);
    }
    if(sec<10){   {/*if the remainder is say,5 seconds,and minutes or quoties is 4, then you want to display 4:05, this is what we are doing here  */}
      secString="0"+sec.toString();
    }else if(sec>=10){
      secString=sec.toString();
    }
    minsString=mins.toString();{/*coverting minutes number to string format */}
    completedTimeString=minsString+":"+secString;
    return completedTimeString;
  }

handleVolumeChange(e){
  console.log("handleVolumeChange is called");
  const newVolume=e.target.value;
  this.audioElement.volume=newVolume;
  this.setState({currentVolume:newVolume});
}



      render() {
        return (
          <section className="album">
          <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
          <h1 id="album-title">{this.state.album.title}</h1>
          <h2 className="artist">{this.state.album.artist}</h2>
          <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
          </section>
          <table id="song-list">
          <colgroup>
          <col id="song-number-column" />
          <col id="song-title-column" />
          <col id="song-duration-column" />
          </colgroup>
          <tbody>
          {
            this.state.album.songs.map( (song, index) =>
            <tr key={index} onClick={() =>this.handleSongClick(song)} onMouseEnter={()=>this.handleMouseEnter(index)} onMouseLeave={()=>this.handleMouseLeave()}>
            {this.renderIcon(index)}
            <td>  {song.title} </td>
            { /*<td>{song.duration}</td>  */}  {/*this displays the song duration in seconds as say,161.71, but to display it in teh format mintes:seconds, call it in the formatTime function */}
            {/* <td>formatTime{song.duration}</td> */}  {/* if you do this,you will see "formatTime", the name of the function on the webpage,you dont want this: Blue	formatTime161.71 ,so enclose formatTime in curly braces*/}
             {/*<td> {formatTime(song.duration)}</td>*/} {/*this will give you a compile error that formatTime is not defined. So we will do this.formatTime */}
            <td>  {this.formatTime(song.duration)}</td> {/*now you will see Blue	2:41 which means duration of the song is 2minutes 41seconds */}
            </tr>
          )
        }
        </tbody>
        </table>
        {/* The play data is contained in Album state, but we'll need to access it in PlayerBar, so here we pass down
        isPlaying and currentSong to PlayerBar as props.*/}
        {/*So, isPlaying,currentSong,handleSongClick,handlePrevClick,handleNextClick are all passed down as props from Album.js to PlayerBar */}
        <PlayerBar
        isPlaying={this.state.isPlaying}
        currentSong={this.state.currentSong}
        handleSongClick={() => this.handleSongClick(this.state.currentSong)}
        handlePrevClick={() => this.handlePrevClick()}
        handleNextClick={()=>this.handleNextClick()}
        currentTime={this.audioElement.currentTime}
        duration={this.audioElement.duration}
        handleTimeChange={(e) => this.handleTimeChange(e)}
        currentVolume={this.state.currentVolume}
        handleVolumeChange = {(e)=>this.handleVolumeChange(e)}
        formatTime={(e)=>this.formatTime(e)}
        />
        </section>
      );
    }
  }

  export default Album;
