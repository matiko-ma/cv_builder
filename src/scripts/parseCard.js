export { parseCard }

const parseCard = (cardBody, cardSmallText) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    const cardTextDiv = document.createElement('div');
    cardTextDiv.classList.add('card_text');
    cardDiv.appendChild(cardTextDiv);
    
    const cardBodyCard = document.createElement('p');
    cardBodyCard.classList.add('card_body');
    cardBodyCard.innerText = cardBody;
    cardTextDiv.appendChild(cardBodyCard);

    const cardSmallTextCard = document.createElement('p');
    cardSmallTextCard.classList.add('input_years');
    cardSmallTextCard.innerText = cardSmallText;
    cardTextDiv.appendChild(cardSmallTextCard);

    const deleteSvgCard = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    deleteSvgCard.classList.add('delete_svg');
    deleteSvgCard.setAttribute('viewBox', '0 0 20 19');
    cardDiv.appendChild(deleteSvgCard);

    const deleteSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    deleteSvgPath.setAttribute('d', 'M11.5 0.125C12.2432 0.125 12.8584 0.66571 12.9775 1.375H18.5C19.3284 1.375 20 2.04657 20 2.875C20 3.70343 19.3284 4.375 18.5 4.375H17.8994L17.0605 16.5469C16.9701 17.8577 15.8804 18.875 14.5664 18.875H5.43359C4.11964 18.875 3.02986 17.8577 2.93945 16.5469L2.10059 4.375H1.5C0.671573 4.375 0 3.70343 0 2.875C0 2.04657 0.671573 1.375 1.5 1.375H7.02246C7.1416 0.66571 7.75685 0.125 8.5 0.125H11.5ZM5.90039 15.875H14.0996L14.8936 4.375H5.10645L5.90039 15.875Z');
    deleteSvgCard.appendChild(deleteSvgPath);

    const dragSvgCard = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    dragSvgCard.classList.add('drag_svg');
    dragSvgCard.setAttribute('viewBox', '0 0 22 15');
    cardDiv.appendChild(dragSvgCard);

    const dragSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    dragSvgPath.setAttribute('d', 'M19.5713 12C20.3997 12.0001 21.0713 12.6716 21.0713 13.5C21.0713 14.3284 20.3997 14.9999 19.5713 15H2.42871C1.60028 15 0.928711 14.3284 0.928711 13.5C0.928711 12.6716 1.60028 12 2.42871 12H19.5713ZM19.5713 6C20.3997 6.00008 21.0713 6.67162 21.0713 7.5C21.0713 8.32838 20.3997 8.99992 19.5713 9H2.42871C1.60028 9 0.928711 8.32843 0.928711 7.5C0.928711 6.67157 1.60028 6 2.42871 6H19.5713ZM19.5713 0C20.3997 7.53728e-05 21.0713 0.671619 21.0713 1.5C21.0713 2.32838 20.3997 2.99992 19.5713 3H2.42871C1.60028 3 0.928711 2.32843 0.928711 1.5C0.928711 0.671573 1.60028 0 2.42871 0H19.5713Z');
    dragSvgCard.appendChild(dragSvgPath);

    const cardId = `card-${Date.now()}`;
    cardDiv.id = cardId;
    
    return cardDiv;
};