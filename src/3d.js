
const { open } = window.__TAURI__.dialog;
const { readBinaryFile } = window.__TAURI__.fs;

// Override the default options with something less restrictive.
var options = {
  width: 500,
  height: 500,
  antialias: true,
  quality: 'medium'
};

// Insert the viewer under the DOM element with id 'viewer'.
var viewer = pv.Viewer(document.getElementById('viewer'), options);

function loadStructure() {
  const input = document.getElementById('pdb-file');
  const file = input.files[0];
  if (!file) {
    alert('Please select a PDB file first.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    const pdbData = event.target.result;
    const structure = pv.io.pdb(pdbData);

    // Display the protein as cartoon, coloring the secondary structure elements in a rainbow gradient.
    viewer.cartoon('protein', structure, { color: pv.color.ssSuccession() });

    // There are two ligands in the structure, the co-factor S-adenosyl homocysteine and the inhibitor ribavirin-5' triphosphate. They have the three-letter codes SAH and RVP, respectively. Let's display them with balls and sticks.
    var ligands = structure.select({ rnames: ['SAH', 'RVP'] });
    viewer.ballsAndSticks('ligands', ligands);
    viewer.centerOn(structure);
  };

  reader.readAsText(file);
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('load-structure').addEventListener('click', loadStructure);
});
