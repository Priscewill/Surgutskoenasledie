function initMap(landmarksData) {
    const map = L.map('map').setView([61.25, 73.40], 10);
    
    // Тайлы OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ''
    }).addTo(map);

    // Настройка попапов
    const popupOptions = {
        className: 'custom-popup',
        maxWidth: 320,
        closeButton: false,
        autoClose: false
    };

    landmarksData.forEach(landmark => {
        // Стандартный маркер Leaflet
        const marker = L.marker(landmark.coords).addTo(map);

        // Контент попапа
        const popupContent = `
            <div class="popup-content">
                <h5>${landmark.name}</h5>
                <div class="popup-image-wrapper">
                    <img src="/static/${landmark.image}" class="popup-image">
                </div>
                <p>${landmark.short_description}</p>
            </div>
        `;

        // Привязка попапа
        const popup = L.popup(popupOptions)
            .setLatLng(landmark.coords)
            .setContent(popupContent);

        // Открытие попапа при наведении
        marker.on('mouseover', () => popup.openOn(map));
        marker.on('mouseout', () => map.closePopup(popup));

        // Клик для перехода на страницу объекта
        marker.on('click', () => {
            window.location.href = `/landmark/${landmark.id}`;
        });
    });
}