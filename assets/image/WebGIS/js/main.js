$("#document").ready(function () {
    var format = 'image/png';
    var bounds = [564182.125, 2317466.0, 564514.4375, 2318014.0];

    var vung = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8888/geoserver/cam_hoang/wms',
            params: {
            'FORMAT': format,
            'VERSION': '1.1.0',
            STYLES: '',
            LAYERS: 'cam_hoang:camhoangdc_1',
            }
        })
    });

    var duong = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8888/geoserver/cam_hoang/wms',
            params: {
            'FORMAT': format,
            'VERSION': '1.1.0',
            STYLES: '',
            LAYERS: 'cam_hoang:camhoanggt_1',
            }
        })
    });

    var diem = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8888/geoserver/cam_hoang/wms',
            params: {
            'FORMAT': format,
            'VERSION': '1.1.0',
            STYLES: '',
            LAYERS: 'cam_hoang:camhoangtt_1',
            }
        })
    });

    var projection = new ol.proj.Projection({
        code: 'EPSG:3405',
        units: 'm',
        axisOrientation: 'neu'
    });

    var map = new ol.Map({
        target: 'map',
        layers: [vung, duong, diem],
        view: new ol.View({
            projection: projection
        })
    });

    // map.getView().fitExtent(bounds, map.getSize());
    map.getView().fit(bounds, map.getSize());

    //Bài 5
    $("#checkVung").change(function () {
        if($("#checkVung").is(":checked")) {
            vung.setVisible(true);
        } else {
            vung.setVisible(false);
        }
    });

    $("#checkDuong").change(function () {
        if($("#checkDuong").is(":checked")) {
            duong.setVisible(true);
        } else {
            duong.setVisible(false);
        }
    });

    $("#checkDiem").change(function () {
        if($("#checkDiem").is(":checked")) {
            diem.setVisible(true);
        } else {
            diem.setVisible(false);
        }
    });
});