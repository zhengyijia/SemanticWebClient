import './index.css';
import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from '../../utils/axios';

// 查询框
class QueryBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sparql: "select * \n" +
                    "where { \n" +
                    "    ?s rdf:type ONTO:Person. \n" +
                    "}LIMIT 10"
        }

        this.sparqlChange = this.sparqlChange.bind(this);
        this.onQueryClick = this.onQueryClick.bind(this);
    }

    sparqlChange(e) {
        this.setState({
            sparql: e.target.value
        });
    }

    onQueryClick() {
        this.props.query(this.state.sparql);
    }

    render() {
        return (
            <div>
                <textarea id="sparql_text" value={this.state.sparql} onChange={this.sparqlChange}></textarea>
                <input type="button" id="query_button" value="查询" onClick={this.onQueryClick}/>
            </div>
        )
    }
}

// 表格中的单元格
class ResultCell extends Component {
    render() {
        const {node} = this.props;

        let element = null;
        if (node.type === "blank") {
            element = <span>_:{node.value}</span>
        } else if (node.type === "uri") {
            element = <span><a href={node.value}>{node.value}</a></span>
        } else if (node.type === "literal") {
            element = <span>{node.value}@{node.lang}</span>
        } else if (node.type === "typed-literal") {
            element = <span>node.value + '^^' + <a href={node.datatype}>{node.datatype}</a></span>
        }

        return (
            <td>{element}</td>
        )
    }
}

// 表格中的一行
class ResultLine extends Component {
    render() {
        const {vars, binding} = this.props;

        return (
            <tr>
                {
                    vars.map(item => (
                        <ResultCell key={item.toString()} node={binding[item]} />
                    ))
                }
            </tr>
        )
    }
}

// 表格
class ResultTable extends Component {
    render() {
        const {state, result} = this.props;

        let thead = null;
        let tbody = null;
        if (state==='查询中') {
            thead = (
                <thead>
                    <tr>
                        <th style={{color: '#666', textAlign: 'left'}}>[Executing querying...]</th>
                    </tr>
                </thead>
            )
        } else if (state==='查询失败') {
            thead = (
                <thead>
                    <tr>
                        <th style={{color: '#ff0000', textAlign: 'left'}}>[查询失败]</th>
                    </tr>
                </thead>
            )
        } else if (state==='查询成功' && result!==undefined) {
            if (result.results.bindings == false) {
                thead = (
                    <thead>
                        <tr>
                            <th>[no results]</th>
                        </tr>
                    </thead>
                )
            } else {
                thead = (
                    <thead>
                        <tr>
                            {
                                result.head.vars.map(item => (
                                    <th key={item.toString()}>{item}</th>
                                ))
                            }
                        </tr>
                    </thead>
                )
                tbody = (
                    <tbody>
                        {
                            result.results.bindings.map(item => (
                                <ResultLine key={result.results.bindings.indexOf(item).toString()}
                                 binding={item} vars={result.head.vars}/>
                            ))
                        }
                    </tbody>
                )
            }
        }

        return (
            <div id="result_box">
                <span style={{display: 'block'}}>SPARQL results:</span>
                <table id="query_result">
                    {thead}
                    {tbody}
                </table>
            </div>
        )
    }
}

// 主界面
class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query_state: "", 
            query_result: null
        }

        this.query = this.query.bind(this);
    }

	componentWillMount(){
        if (cookie.load('token') === undefined) {
            this.props.history.push('./login', null);
        }
    }

    query(sparql) {
        this.setState({
            query_state: "查询中"
        });
        axios.get(
            'api/query/query_sparql',
            {
                params: {
                    sparql: sparql
                }
            }
        )
        .then(function (response) {
            this.setState({
                query_state: "查询成功", 
                query_result: response.data
            });
            console.log(response);
        }.bind(this))
        .catch(function (error) {
            console.log(error);
            this.setState({
                query_state: "查询失败"
            });
        }.bind(this));
    }

    render() {
        return (
            <div id='main_box'>
                <QueryBox query={this.query}/>
                <ResultTable state={this.state.query_state} result={this.state.query_result}/>
            </div>
        )
    }
}

export default Home