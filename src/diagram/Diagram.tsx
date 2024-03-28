import * as d3 from "d3";
import React, {useEffect, useRef} from "react";
import {BookDto} from "../api/BookDto";

interface DiagramProps {
  data: BookDto[]
}

const Diagram: React.FC<DiagramProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) {
      return
    }

    const svg = d3.select(svgRef.current);

    const margin = 20
    const width = svg.attr('width') as unknown as number - margin - margin;
    const height = svg.attr('height') as unknown as number - margin - margin;

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin},${margin})`);

    const months = Array
      .from({ length: 12 }, (_, i) => i)
      .map(month => ({
        month,
        count: data.filter(book => new Date(book?.publishDate).getMonth() === month)?.length
      }));

    x.domain([0, 12]);
    y.domain([0, d3.max(months, d => d?.count)!]);

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Books count');

    g.selectAll('.bar')
      .data(months)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('fill', 'red')
      .attr('x', d => x(d.month) + width / 48)
      .attr('y', d => y(d.count))
      .attr('width', width / 24)
      .attr('height', d => height - y(d.count));
  }, [data]);

  return (
    <svg
      ref={svgRef}
      width={700}
      height={400}
    />
  );
}

export default Diagram;
