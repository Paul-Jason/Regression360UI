import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCommitHistory } from "../actions/commit";
import {bindActionCreators}  from 'redux';
import Header from './Header';
import BarChartFile from './charts/BarChartFile';
import DoughnutTicketType from './charts/DoughnutTicketType';
import DoughnutCommitPriority from './charts/DoughnutCommitPriority';
import LineDataInsights from './charts/LineDataInsights';
import TableDataInsights from './charts/TableDataInsights';
import MiscellanousCard from './MiscellanousCard';
import DataTable from './charts/DataTable';
import PredictRisks from './PredictRisks';
import '../../scss/main.css';

class Core extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          displayDataInsightsView: 'table'
        };
        console.log("core");
        console.log(props);
    }    

    //componentDidMount() {
        //this.props.fetchCommitHistory(this.props.match.params.commitId);
    //}

    changeDisplay () {
        let { displayDataInsightsView } = this.state;
        this.setState({ displayDataInsightsView: displayDataInsightsView === 'lineGraph' ? 'table' : 'lineGraph' });
    }

    renderInner() {
        let { displayDataInsightsView } = this.state;
        if (displayDataInsightsView === 'lineGraph') {
          return <LineDataInsights />
        } else if (displayDataInsightsView === 'table') {
          return <DataTable />
        }
    }

    render() {
        const { isFetching, state } = this.props.commitHistory;
        if(isFetching) {
            return (
                <div>
                    <div class="container">
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
                    <h2>Please wait until Regression 360 finds Insights for you!</h2>
                </div>  
            );
        }
        const data = state.data;
        var keys = Object.keys(data); 
        return (
            <div class="container-fluid">
                <div class="row" >
                    <div class="col-4">
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">Pick what daunts you!</h5>
                                <BarChartFile/>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">Pick Commits Priority wise!</h5>
                                <DoughnutCommitPriority/>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">Pick Tickets type wise!</h5>
                                <DoughnutTicketType/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" >
                    <div class="col-9">
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">Your Data Insights!
                                    <button type="button" class="btn btn-light lineInsightButton" title="Switch view" onClick={this.changeDisplay.bind(this)} data-toggle="tooltip" data-placement="bottom" data-trigger="hover"><i class="fas fa-bars"></i></button>
                                </h5>
                                {this.renderInner()}
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                       <MiscellanousCard/>
                    </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Core);