const { open } = window.__TAURI__.dialog;
const { readBinaryFile } = window.__TAURI__.fs;
// override the default options with something less restrictive.
var options = {
  width: 500,
  height: 500,
  antialias: true,
  quality: 'medium'
};
// insert the viewer under the Dom element with id 'gl'.
var viewer = pv.Viewer(document.getElementById('viewer'), options);
document.addEventListener('DOMContentLoaded', () => {
  const selectFileButton = document.getElementById('selectFile');

  if (selectFileButton) {
    selectFileButton.addEventListener('click', async () => {
      try {
        const selected = await open({
          multiple: false,
          filters: [{
            name: 'All Files',
            extensions: ['*']
          }]
        });
        if (selected) {
          console.log('File path:', selected);
          let apiPath = window.__TAURI__.tauri.convertFileSrc(selected)
          function loadStructure() {
            // asynchronously load the PDB file for the dengue methyl transferase
            // from the server and display it in the viewer.
            pv.io.fetchPdb(apiPath, function (structure) {
              // display the protein as cartoon, coloring the secondary structure
              // elements in a rainbow gradient.
              viewer.cartoon('protein', structure, { color: color.ssSuccession() });
              // there are two ligands in the structure, the co-factor S-adenosyl
              // homocysteine and the inhibitor ribavirin-5' triphosphate. They have
              // the three-letter codes SAH and RVP, respectively. Let's display them
              // with balls and sticks.
              var ligands = structure.select({ rnames: ['SAH', 'RVP'] });
              viewer.ballsAndSticks('ligands', ligands);
              viewer.centerOn(structure);
            });
          }

          // load the methyl transferase once the DOM has finished loading. That's
          // the earliest point the WebGL context is available.
          document.addEventListener('DOMContentLoaded', loadStructure);
          document.getElementById('filePath').innerText = selected;
          // await processFile(selected);
        } else {
          console.log('No file selected');
        }
      } catch (error) {
        console.error('Error opening file dialog:', error);
      }
    });
  } else {
    console.error('selectFile button not found');
  }
});

// function loadStructure() {
//   // asynchronously load the PDB file for the dengue methyl transferase
//   // from the server and display it in the viewer.
//   pv.io.fetchPdb(selected, function (structure) {
//     // display the protein as cartoon, coloring the secondary structure
//     // elements in a rainbow gradient.
//     viewer.cartoon('protein', structure, { color: color.ssSuccession() });
//     // there are two ligands in the structure, the co-factor S-adenosyl
//     // homocysteine and the inhibitor ribavirin-5' triphosphate. They have
//     // the three-letter codes SAH and RVP, respectively. Let's display them
//     // with balls and sticks.
//     var ligands = structure.select({ rnames: ['SAH', 'RVP'] });
//     viewer.ballsAndSticks('ligands', ligands);
//     viewer.centerOn(structure);
//   });
// }

// // load the methyl transferase once the DOM has finished loading. That's
// // the earliest point the WebGL context is available.
// document.addEventListener('DOMContentLoaded', loadStructure);

