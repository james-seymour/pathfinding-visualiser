(this["webpackJsonppathfinding-visualiser"]=this["webpackJsonppathfinding-visualiser"]||[]).push([[0],{13:function(t,e,n){},15:function(t,e,n){},16:function(t,e,n){},17:function(t,e,n){"use strict";n.r(e);var s=n(1),a=n.n(s),i=n(8),r=n.n(i),o=n(2),c=n(3),u=n(5),d=n(4),l=n(6),h=function(t){t.sort((function(t,e){return t.distance-e.distance}))},N=function(t,e){var n,s=f(t,e),a=Object(l.a)(s);try{for(a.s();!(n=a.n()).done;){var i=n.value;i.distance=t.distance+1,i.previousNode=t}}catch(r){a.e(r)}finally{a.f()}},f=function(t,e){var n=[],s=t.row,a=t.col;return s>0&&n.push(e[s-1][a]),s<e.length-1&&n.push(e[s+1][a]),a>0&&n.push(e[s][a-1]),a<e[0].length-1&&n.push(e[s][a+1]),n.filter((function(t){return!t.isVisited}))},O=function(t,e,n){var s=[];e.distance=0;for(var a=function(t){var e,n=[],s=Object(l.a)(t);try{for(s.s();!(e=s.n()).done;){var a,i=e.value,r=Object(l.a)(i);try{for(r.s();!(a=r.n()).done;){var o=a.value;n.push(o)}}catch(c){r.e(c)}finally{r.f()}}}catch(c){s.e(c)}finally{s.f()}return n}(t);a.length;){h(a);var i=a.shift();if(!i.isWall){if(i.distance===1/0)return{algorithmCalculation:s,endNodeReachable:!1};if(i.isVisited=!0,s.push(i),i===n)return{algorithmCalculation:s,endNodeReachable:!0};N(i,t)}}};n(13);var m=n(0),p=function(t){Object(u.a)(n,t);var e=Object(d.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){var t=this;return Object(m.jsx)("div",{id:"node-".concat(this.props.nodeData.row,"-").concat(this.props.nodeData.col),className:"node ".concat(this.props.nodeData.isFinish?"node-finish":this.props.nodeData.isStart?"node-start":""),onMouseDown:function(){return t.props.onMouseDown(t.props.nodeData.row,t.props.nodeData.col)},onMouseEnter:function(){return t.props.onMouseEnter(t.props.nodeData.row,t.props.nodeData.col)},onMouseUp:function(){return t.props.onMouseUp()}})}}]),n}(s.PureComponent),g=(n(15),function(t){Object(u.a)(n,t);var e=Object(d.a)(n);function n(){var t;return Object(o.a)(this,n),(t=e.call(this)).createNode=function(e,n){var s=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return{row:e,col:n,isStart:e===t.state.START_NODE_ROW&&n===t.state.START_NODE_COL,isFinish:e===t.state.END_NODE_ROW&&n===t.state.END_NODE_COL,isWall:s,distance:1/0,distanceToFinishNode:Math.abs(t.state.END_NODE_ROW-e)+Math.abs(t.state.END_NODE_COL-n),isVisited:!1,previousNode:null}},t.createGridData=function(){for(var e=[],n=0;n<t.state.NUM_ROWS;n++){for(var s=[],a=0;a<t.state.NUM_COLS;a++)s.push(t.createNode(n,a));e.push(s)}return e},t.getStartNode=function(e){return e[t.state.START_NODE_ROW][t.state.START_NODE_COL]},t.getEndNode=function(e){return e[t.state.END_NODE_ROW][t.state.END_NODE_COL]},t.syncHTMLwithGridData=function(){for(var e=[],n=0;n<t.state.NUM_ROWS;n++){for(var s=[],a=0;a<t.state.NUM_COLS;a++)"node node-wall"===t.getNodeClassName(n,a)?s.push(t.createNode(n,a,!0)):s.push(t.createNode(n,a));e.push(s)}return e},t.animateAlgorithm=function(e){for(var n=function(n){setTimeout((function(){var s=e[n];t.updateNodeClassName(s.row,s.col,"node-visited")}),10*n)},s=1;s<e.length-1;s++)n(s);setTimeout((function(){t.setState({isRunning:!1})}),10*(e.length+1)),t.setState({gridData:t.syncHTMLwithGridData()})},t.animateShortestPath=function(t){},t.resetElementInGrid=function(e){for(var n=0;n<t.state.NUM_ROWS;n++)for(var s=0;s<t.state.NUM_COLS;s++){var a=t.getNodeClassName(n,s);a!=="node ".concat(e)&&"node node-start"!==a&&"node node-finish"!==a&&t.updateNodeClassName(n,s,"")}},t.state={gridData:[],START_NODE_ROW:Math.floor(window.screen.height/200-1),START_NODE_COL:Math.floor(window.screen.width/300-1),END_NODE_ROW:Math.floor(3*window.screen.height/200),END_NODE_COL:Math.floor(5*window.screen.width/300),userPaintingWalls:!1,userMovingStartNode:!1,userMovingEndNode:!1,NUM_ROWS:Math.floor((window.screen.height-250)/30),NUM_COLS:Math.floor((window.screen.width-100)/30),isRunning:!1,isStartNode:!1,isFinishNode:!1,isWallNode:!1,currentRow:0,currentCol:0},t}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var t=this.createGridData();this.setState({gridData:t})}},{key:"getNodeClassName",value:function(t,e){return document.getElementById("node-".concat(t,"-").concat(e)).className}},{key:"updateNodeClassName",value:function(t,e,n){document.getElementById("node-".concat(t,"-").concat(e)).className="node ".concat(n)}},{key:"handleMouseDown",value:function(t,e){console.log(this.state),this.state.isRunning||(this.state.START_NODE_ROW===t&&this.state.START_NODE_COL===e?this.setState({userMovingStartNode:!0}):this.state.END_NODE_ROW===t&&this.state.END_NODE_COL===e?this.setState({userMovingEndNode:!0}):(this.setState({userPaintingWalls:!0}),this.updateNodeClassName(t,e,"node-wall")))}},{key:"handleMouseEnter",value:function(t,e){var n=this.state.START_NODE_ROW===t&&this.state.START_NODE_COL===e,s=this.state.END_NODE_ROW===t&&this.state.END_NODE_COL===e;this.state.isRunning||n||s||(this.state.userMovingStartNode?(this.updateNodeClassName(this.state.START_NODE_ROW,this.state.START_NODE_COL,""),this.updateNodeClassName(t,e,"node-start"),this.setState({START_NODE_ROW:t,START_NODE_COL:e})):this.state.userMovingEndNode?(this.updateNodeClassName(this.state.END_NODE_ROW,this.state.END_NODE_COL,""),this.updateNodeClassName(t,e,"node-finish"),this.setState({END_NODE_ROW:t,END_NODE_COL:e})):this.state.userPaintingWalls&&this.updateNodeClassName(t,e,"node-wall"))}},{key:"handleMouseUp",value:function(){this.state.isRunning||(this.setState({userMovingStartNode:!1,userMovingEndNode:!1,userPaintingWalls:!1}),this.syncHTMLwithGridData(this.state.gridData))}},{key:"toggleIsRunning",value:function(){this.setState({isRunning:!this.state.isRunning})}},{key:"parseAlgorithmChoice",value:function(t){if(!this.state.isRunning){this.setState({isRunning:!0}),this.resetElementInGrid("node-wall");var e=this.syncHTMLwithGridData(),n=this.getStartNode(e),s=this.getEndNode(e);switch(t){case"dijkstra":var a=O(e,n,s),i=a.algorithmCalculation;a.endNodeReachable;this.animateAlgorithm(i);break;case"A*":var r=function(t,e,n){var s=[],a=[];for(a.push(e);a.length;){var i=a.pop();if(!i.isWall&&(i.isStart||!i.isVisited)){i.isVisited=!0,s.push(i);var r=i.col,o=i.row,c=void 0;o>0&&((c=t[o-1][r]).isVisited||(c.previousNode=i,a.push(c))),o<t.length-1&&((c=t[o+1][r]).isVisited||(c.previousNode=i,a.push(c))),r>0&&((c=t[o][r-1]).isVisited||(c.previousNode=i,a.push(c))),r<t[0].length-1&&((c=t[o][r+1]).isVisited||(c.previousNode=i,a.push(c)))}if(i===n)return s}}(e,n,s);this.animateAlgorithm(r)}}}},{key:"clearWalls",value:function(){this.state.isRunning||this.resetElementInGrid("node-visited")}},{key:"clearAlgorithmSteps",value:function(){this.state.isRunning||this.resetElementInGrid("node-wall")}},{key:"clearEntireCanvas",value:function(){this.state.isRunning||(this.setState({gridData:this.createGridData()}),this.resetElementInGrid(""))}},{key:"renderGrid",value:function(){var t=this,e=this.state.gridData;return Object(m.jsx)("div",{className:"grid",children:e.map((function(e,n){return Object(m.jsx)("div",{className:"row row-".concat(n),children:e.map((function(e,n){return Object(m.jsx)(p,{nodeData:e,onMouseDown:function(e,n){t.handleMouseDown(e,n)},onMouseEnter:function(e,n){t.handleMouseEnter(e,n)},onMouseUp:function(){t.handleMouseUp()}},n)}))},n)}))})}},{key:"renderUserInterface",value:function(){var t=this;return Object(m.jsxs)("div",{className:"userinterface",children:[Object(m.jsx)("div",{className:"userinterface-header",children:Object(m.jsx)("a",{id:"homepageRefresh",className:"navbar",href:"",children:"Pathfinding Visualiser"})}),Object(m.jsxs)("div",{className:"dropdown",children:[Object(m.jsx)("button",{className:"dropbtn",children:"Run an Algorithm!"}),Object(m.jsxs)("div",{className:"dropdown-content",children:[Object(m.jsx)("button",{id:"Dijkstra",className:"button algorithm-button",onClick:function(){return t.parseAlgorithmChoice("dijkstra")},children:"Djikstra's Algorithm"}),Object(m.jsx)("button",{id:"AStar",className:"button algorithm-button",onClick:function(){return t.parseAlgorithmChoice("A*")},children:"A* Search"}),Object(m.jsx)("button",{id:"Greedy",className:"button algorithm-button",onClick:function(){return t.parseAlgorithmChoice("greedy")},children:"Run Greedy Best-First Search"}),Object(m.jsx)("button",{id:"Swarm",className:"button algorithm-button",onClick:function(){return t.parseAlgorithmChoice("swarm")},children:"Run Swarm Algorithm"})]})]}),Object(m.jsx)("button",{id:"clear-walls",className:"button clear-button",onClick:function(){return t.clearWalls()},children:"Clear Placed Walls!"}),Object(m.jsx)("button",{id:"clear-algorithm-steps",className:"button clear-button",onClick:function(){return t.clearAlgorithmSteps()},children:"Clear Visited Nodes!"}),Object(m.jsx)("button",{id:"clear-board",className:"button clear-button",onClick:function(){return t.clearEntireCanvas()},children:"Clear the Entire Board!"})]})}},{key:"render",value:function(){return Object(m.jsxs)(m.Fragment,{children:[this.renderUserInterface(),this.renderGrid(),Object(m.jsxs)("div",{className:"footer",children:["Created by James Seymour. Check out my other projects on my Github ",Object(m.jsx)("a",{href:"https://github.com/james-seymour",children:"here"})]})]})}}]),n}(s.Component));n(16);var v=function(){return document.documentElement.style.setProperty("--screen-x",Math.floor((window.screen.width-100)/30)),document.body.style="background-color: rgb(151, 143, 213);",Object(m.jsx)("div",{className:"main",children:Object(m.jsx)(g,{})})};r.a.render(Object(m.jsx)(a.a.StrictMode,{children:Object(m.jsx)(v,{})}),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.2e902b94.chunk.js.map