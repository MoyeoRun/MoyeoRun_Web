const getOrCreateTooltip = (chart) => {
  console.log(chart);
  let tooltipEl = chart.canvas.parentNode.querySelector('div');
  // 툴팁 박스 엘레먼트 조절
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.background = 'rgba(0, 0, 0, 0.4)';
    // tooltipEl.style.borderRadius = '3px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    // tooltipEl.style.transform = 'translate(0,-50%)';
    tooltipEl.style.transition = 'all .2s ease';

    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);

    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

const externalTooltipHandler = (context) => {
  // Tooltip Element

  console.log(context);

  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text  -> 툴팁아래  t body 부분
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map((b) => b.lines);

    const tableHead = document.createElement('thead');

    titleLines.forEach((title) => {
      const tr = document.createElement('tr');
      tr.style.borderWidth = 0;

      const th = document.createElement('th');
      th.style.borderWidth = 0;
      const text = document.createTextNode(title + '일');

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement('tbody');
    bodyLines.forEach((body, i) => {
      //툴팁 색깔박스 보여주는 엘리먼트. 삭제함
      // const colors = tooltip.labelColors[i];
      // const span = document.createElement('span');
      // span.style.background = colors.backgroundColor;
      // span.style.borderColor = colors.borderColor;
      // span.style.borderWidth = '2px';
      // span.style.marginRight = '10px';
      // span.style.height = '10px';
      // span.style.width = '10px';
      // span.style.display = 'inline-block';

      const tr = document.createElement('tr');
      tr.style.backgroundColor = 'inherit';
      tr.style.borderWidth = 0;

      const td = document.createElement('td');
      td.style.borderWidth = 0;

      const text = document.createTextNode(body + 'km');
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector('table');

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  // 여기서 툴팁 위치 조정 가능한데 지금 안함

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  console.log(positionX, positionY, tooltip.caretX, tooltip.caretY);
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = '4px' + ' 4px';
};

export default externalTooltipHandler;
