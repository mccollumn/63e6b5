// __mocks__/digraph-js.js
module.exports = {
  DiGraph: jest.fn().mockImplementation(() => ({
    addVertex: jest.fn(),
    addEdge: jest.fn(),
    traverseEager: jest.fn(() => []),
    getDeepParents: jest.fn(() => ({ toArray: () => [] })),
  })),
  VertexDefinition: jest.fn(),
  VertexBody: jest.fn(),
};
