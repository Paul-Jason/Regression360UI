import React,{Component} from 'react';
import { connect } from 'react-redux';

class TableDataInsights extends Component{
    componentDidMount(){
        // $(document).ready(function() {
        //     $('#dataTable').DataTable();
        // });
    }
    render(){
        var tableData = this.props.tableDataInsightsData.tableDataInsightsData;
        return(
            <div class="table-responsive">
                <table id="dataTable" class="table table-bordered table-sm" cellspacing="0" width="100%">
                    <thead class="thead-light">
                        <tr class="d-flex">
                            <th scope="col" class="col-sm-1 text-center">Jira Id</th>
                            <th scope="col" class="col-sm-6 text-center">Jira Summary</th>
                            <th scope="col" class="col-sm-1 text-center">Risk (%)</th>
                            <th scope="col" class="col-sm-2 text-center">Jira link</th>
                            <th scope="col" class="col-sm-2 text-center">Git Url</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData.map((commit) =>
                                <tr class="d-flex">
                                    <td class="col-sm-1 text-center">{commit.jiraId}</td>
                                    <td class="col-sm-6 text-center">{commit.jiraSummary}</td>
                                    <td class="col-sm-1 text-center">{commit.riskPercent}</td>
                                    <td class="col-sm-2 text-center">{commit.jiraUrl}</td>
                                    <td class="col-sm-2 text-center">{commit.gitUrl}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        tableDataInsightsData : state.tableDataInsightsData
    };
}

export default connect(mapStateToProps)(TableDataInsights);