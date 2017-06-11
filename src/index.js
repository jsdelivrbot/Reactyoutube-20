import _ from 'lodash';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyBpTZpoLjmUqbxIlBOCghNG7bwsY6Eg-bg';

class App extends Component {
	constructor(props){
		super(props);

		this.state = { videos : [],
		               selectedVideo : null 
		              };

		this.videoSearch('surfboards');
	}

	videoSearch(searchTerm){
		YTSearch({key : API_KEY, term: searchTerm}, (videos) => {

			this.setState({ videos : videos,
			                selectedVideo : videos[0] 
			            });
	   
         });
	}
 
	render() {

		const videoSearch = _.debounce((searchTerm) => {this.videoSearch(searchTerm)}, 300 );

		return (
		<div> 
	      <SearchBar onSearchTermChange= {videoSearch} />
	      <VideoDetail video= {this.state.selectedVideo} />
	      <VideoList videos = {this.state.videos} onVideoSelect= {selectedVideo => this.setState({selectedVideo})} />
	    </div>
	    ); 
	}
}

ReactDom.render(<App/>, document.querySelector('.container'));