const generateVertexes = ({ x, y, z }) => {
  const numberOfFigures = x * y * z;
  const vertex = {
    x: 0,
    y: 0,
    z: 0,
  };
  const vertexes = [];

  for (let i = 0; i < numberOfFigures; i++) {
    vertexes.push({ ...vertex });

    if (vertex.x < x - 1) {
      vertex.x += 1;
    } else if (vertex.y < y - 1) {
      vertex.x = 0;
      vertex.y += 1;
    } else if (vertex.z < z - 1) {
      vertex.x = 0;
      vertex.y = 0;
      vertex.z += 1;
    }
  }

  return vertexes;
};

export { generateVertexes };
