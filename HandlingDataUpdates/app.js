// Some DataSets are massive and will bring any web browser to its knees if you
// try to load the entire thing. To keep your app performing optimally, take
// advantage of filtering, aggregations, and group by's to bring down just the
// data your app needs. Do not include all columns in your data mapping file,
// just the ones you need.
//
// For additional documentation on how you can query your data, please refer to
// https://developer.domo.com/docs/dev-studio/dev-studio-data

(function(domo){
  var COUNTER = 0;
  var TOTAL = 0;

  // main function to fetch data from domo
  function getData(alias) {
    COUNTER += 1;
    domo.get('/data/v1/' + alias + '?sum=total')
      .then(function(data) {
        TOTAL = data[0].total;
        updateUI();
      });
  }

  // add variables to UI
  function updateUI(){
    var totalEl = document.getElementById('total');
    var counterEl = document.getElementById('updateCount');

    totalEl.innerHTML = TOTAL.toString();
    counterEl.innerHTML = COUNTER.toString();
  }

  // initial fetch
  console.info('App Ready...');
  getData('SampleSales');
})(domo);

domo.onDataUpdate(function(alias) {
  console.info('domo.onDataUpdate: ', new Date().getTime());
  getData(alias);
});

