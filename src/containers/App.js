import React, { Component} from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';
import { setSearchField, requestRobots } from '../actions';
/*
static mode:
1. the constructor is being invoked and set the arguments inside the object state
2. 2nd is the render function which invoked and since the robots array is still empty the filter return an empty array so
the render returns Loading because the length of robots is empty.
3. then react invoked the componentDidMount() which intialize the robots array from the data base and setState (react API) which
invoked the render again under Update Life Cycle
4. now because the searchFiled is initalized with the character '' everything match the filter condition (the includes method of strings),
however if it was initalized with another character for instance 'd' it would return only the robots who have 'd' appears in their name.
5.assuming nobody entered something to the searchBox or scrolled the side-bar cardList component will eventually be called with props of
filterdRobots array.
6. each virtual DOM such as CardList also has render() altought it's a pure function. so inside we are using map to build cardArray
with the parameters we want and then send it to Card component.
7. the Card component builds each card and sets the robot picture the name and the email and everything is stored at cardArray at CardList component.
8. in the end CardList returns/rendered the cardArray and it is displayed on the website.
dymanic mode:
1. since searchField is a state (the word state is important) when it's value is changed the Lify Cycles hooks are re-invoked.
also inside SearchBox component we are using the HTML tag onChange this is like the eventLisener that listen to events in the search box. (<input type="search"/>),
so now when we type somethinf in the search box it calls to the function onSearchChange and due to setState we update the value of 
searchField inside this.state object. also the setState calls the render and from here everything is the same as in static mode.
2. another important thing is that the Scroll component wraps the CardList component and inside of Scroll component the thing that is being rendered is props.children which
means anything that defined in scroll will be applied on CardList because everything that between <Scroll> to </Scroll> are his children.
 */
 const mapStateToProps = (state) => {
     return {
         searchField: state.searchRobots.searchField,
         robots: state.requestRobots.robots,
         isPending: state.requestRobots.isPending,
         error: state.requestRobots.isPending
     }
 }

 /* According to my assumption we first call mapDispatchToProps and inside we are binding internal function to onSearchChange */
 const mapDispatchToProps = (dispatch) => {
     return {
         onSearchChange: (event) => { 
              return dispatch(setSearchField(event.target.value))
         },
         onRequestRobots: () => dispatch(requestRobots())
     }
 }

class App extends Component {
    /*
    constructor() {
        super();
        this.state = {
            robots: []
            //,searchField: ''
        }
    }*/
    //componentDidMount, constructor and render are functions of React so we don't call them with Arrow Function
    componentDidMount() {
        /*
        fetch('http://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots: users}));*/
        this.props.onRequestRobots();
    }

    /*
    onSearchChange = (event) => {
        //in order that searchField will update must set it setState
        //everytime setState is called react will invoke the render();
        this.setState({searchField: event.target.value});
    }*/

    render() {
        //const {robots/*, searchField*/} = this.state;
        //My assumption is that the following are given props because we call their functions mapStateToProps and mapDispatchToProps
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        if (isPending) {
            return <h1>Loading...</h1>
        }
        else {
            return (
                <div className='tc'> 
                <h1 className="f1">Robo Friends</h1>
                <SearchBox searchChang={/*this.*/onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                    <CardList robots={ filteredRobots }/>
                    </ErrorBoundary>
                </Scroll>
                </div>
            );
        }
    }
}
//connect is gonna run and return a function which is going to run App
export default connect(mapStateToProps, mapDispatchToProps)(App);