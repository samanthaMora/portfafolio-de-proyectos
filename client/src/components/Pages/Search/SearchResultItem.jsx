const SearchResultItem = ({ proyecto }) => {
  const handleClick = () => {
    alert(`Proyecto: ${proyecto.titulo} por ${proyecto.username}`);
  };

  return (
    <tr onClick={handleClick} style={{ cursor: "pointer" }}>
      <td>{proyecto.titulo}</td>
      <td>{proyecto.descripcion}</td>
      <td>{proyecto.username}</td>
    </tr>
  );
};

export default SearchResultItem;


