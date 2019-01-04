import $ from 'jquery';
import {makeFlowChart} from './code-analyzer';
import  Viz from 'viz.js';
import {Module,render} from 'viz.js/full.render.js';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let code = $('#codePlaceholder').val();
        let vector = ($('#inputVector').val());
        let viz = new Viz({ Module, render });
        viz.renderString('digraph { ' +  makeFlowChart(code,vector) + ' }')
            .then(function(graph) {
                document.getElementById('diagram').innerHTML = graph;
            });

    });
});
