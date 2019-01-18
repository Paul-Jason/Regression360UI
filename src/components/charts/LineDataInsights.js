import React,{Component} from 'react'
import {Line} from 'react-chartjs-2';
import {bindActionCreators}  from 'redux';
import { connect } from 'react-redux';
import {setBarChartFileData} from "../../actions/charts/BarChartFile";

class LineDataInsights extends Component{

    componentDidMount(){
        
    }
    render(){    
        var graphData = this.props.lineDataInsightsData.lineDataInsightsData;
        var onClickLineTooltip = function(elems){
            console.log("Line tooltip")
            console.log(elems);
            console.log(graphData);
            var index = elems[0]["_index"];
            var gitUrl = graphData["datasets"][0]["data"][index]["gitUrl"];
            window.open(gitUrl);
            console.log(graphData["datasets"][0]["data"][index]["gitUrl"]);
        } 
        var graphOptions = this.props.lineDataInsightsData.lineDataInsightsOptions;
        return(
            <div>
                <Line data={graphData} options={graphOptions} getElementAtEvent={(elems) => {onClickLineTooltip(elems)} }></Line>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        lineDataInsightsData : state.lineDataInsightsData
    };
}

export default connect(mapStateToProps)(LineDataInsights)