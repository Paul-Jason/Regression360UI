import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCommitHistory } from "../actions/commit";
import {bindActionCreators}  from 'redux';
import Header from './Header';
import Core from './Core';
import PredictRisks from './PredictRisks';
import '../../scss/main.css';

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          displayView: 'core'
        };
        this.changeView = this.changeView.bind(this);
    }  
    
    changeView() {
        let { displayView } = this.state;
        this.setState({ displayView: displayView === 'core' ? 'predictRisks' : 'core' });
    }

    componentDidMount() {
        this.props.fetchCommitHistory(this.props.match.params.commitId);
    }

    renderInner() {
        let { displayView } = this.state;
        if (displayView === 'core') {
          return <Core />
        } else if (displayView === 'predictRisks') {
          return <PredictRisks />
        }
    }

    render() {
        const { isFetching, state } = this.props.commitHistory;
        if(isFetching) {
            return (
                <div>
                    <div class="container">
                        <div class="row">
                            <h2>Please wait until Regression 360 finds Insights for you!</h2>
                        </div>
                        <div class="row">
                                <div id="loading">
                                    <ul class="bokeh">
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ul>
                                </div>
                        </div>
                    </div>
                </div>  
            );
        }
        const data = state.data;
        console.log("app")
        console.log(data);
        var keys = Object.keys(data); 
        return (
            <div class="container-fluid">
                <Header changeView = {this.changeView} displayState= {this.state.displayView}/>
                <br></br>
                <div >
                    {this.renderInner()}
                </div>
            </div>
        );
      }
}

function mapStateToProps(state){
    return{
        commitHistory: state.commitHistory,
        pieChartTicketTypeData: state.pieChartTicketTypeData
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchCommitHistory}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);