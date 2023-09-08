import { useRef, useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const BubbleMapWidget = ({ data }) => {

    useLayoutEffect(() => {

        // Create root element
        let root = am5.Root.new("chartdiv");

        // Set themes
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        const chartData = { 
            ...data,
            children: [{
                ...data.data.children[0],
                // x: am5.percent(80),
                // y: am5.percent(20),
            },
            {
                ...data.data.children[1],
                // x: am5.percent(50),
                // y: am5.percent(50),
            },
            {
                ...data.data.children[2],
                // x: am5.percent(20),
                // y: am5.percent(40),
            },
            {
                ...data.data.children[3],
                // x: am5.percent(30),
                // y: am5.percent(60),
            }]
        }

        // Create wrapper container
        const container = root.container.children.push(
            am5.Container.new(root, {
                width: am5.percent(100),
                height: am5.percent(100),
                layout: root.verticalLayout
            })
        );

        // Create series
        let series = container.children.push(
            am5hierarchy.ForceDirected.new(root, {
                topDepth: 1,
                initialDepth: 0,
                minRadius: 40,
                maxRadius: am5.percent(20),
                valueField: "value",
                categoryField: "name",
                shortNameField: "shortName",
                childDataField: "children",
                nodePadding: 10,
                // xField: "x",
                // yField: "y"
            })
        );

        series.data.setAll([chartData]);

        // Disable Toogle and Draggable
        series.nodes.template.setAll({
            // toggleKey: "none",
            // cursorOverStyle: "default",
            draggable: false
        });

        // Custom label
        series.labels.template.setAll({
            text: "[fontSize: 15px]{shortName}[/]\n[fontSize: 20px]{sum}[/]",
            fontSize: 14
        });

        // Outer circles
        series.outerCircles.template.states.create("disabled", {
            fillOpacity: 0.5,
            strokeOpacity: 0,
            strokeDasharray: 0
        });
        series.outerCircles.template.states.create("hoverDisabled", {
            fillOpacity: 0.5,
            strokeOpacity: 0,
            strokeDasharray: 0
        });

        return () => {
            root.dispose();
        };
    }, []);

    return <div id="chartdiv" style={{ width: "100%", height: "100%" }}></div>
}

export default BubbleMapWidget;