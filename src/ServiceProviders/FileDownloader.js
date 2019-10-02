import RNBackgroundDownloader from 'react-native-background-downloader';


export default DownloadFile = function(url,destination){
    let task = RNBackgroundDownloader.download({
        id: 'file123',
        url,
        destination: destination || `${RNBackgroundDownloader.directories.documents}/file`
    }).begin((expectedBytes) => {
        console.log(`Going to download ${expectedBytes} bytes!`);
    }).progress((percent) => {
        console.log(`Downloaded: ${percent * 100}%`);
    }).done(() => {
        console.log('Download is done!');
    }).error((error) => {
        console.log('Download canceled due to error: ', error);
    });
}