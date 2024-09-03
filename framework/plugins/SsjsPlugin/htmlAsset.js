function htmlAsset(js) {

    const newContent = `<script runat="server">Platform.Load("core", "1.1.1");${js}</script>`;
    return newContent;

}

module.exports = htmlAsset;