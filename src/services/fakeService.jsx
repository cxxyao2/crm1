export function getMovies() {
  return [
    { title: "fur1", genre: "action", stock: 12, rate: 12.5, liked: true },
    { title: "fur2", genre: "action", stock: 13, rate: 2.5, liked: false  },
    { title: "fur3", genre: "action", stock: 24, rate: 2.5, liked: false },
    { title: "fur4", genre: "romantic", stock: 12, rate: 2.5, liked: false },
    { title: "fur5", genre: "romantic", stock: 113, rate: 2.5, liked: false },
    { title: "fur6", genre: "action", stock: 114, rate: 22.5, liked: true },
    { title: "fur7", genre: "action", stock: 14, rate: 45.5, liked: false },
    { title: "fur8", genre: "violent", stock: 54, rate: 22.5, liked: false },
    { title: "fur9", genre: "action", stock: 14, rate: 2.5, liked: true }
  ];
}

export function getGenres() {
  return [
    { id: "1", name: "action"},
    { id: "2", name: "romantic"},
    { id: "3", name: "violent"},
    { id: "4", name: "imaginative"},
  ];
}