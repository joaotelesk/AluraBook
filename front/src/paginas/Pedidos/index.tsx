import { AbBotao } from "ds-alurabooks";
import axios from "axios";
import "./Pedidos.css";
import { useEffect, useState } from "react";
import { IPedido } from "../../interfaces/IPedido";
import http from "../../Http";

const Pedidos = () => {
  const formatador = Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  const [pedidos, setPedidos] = useState<IPedido[]>([]);

  useEffect(() => {
    http
      .get<IPedido[]>("http://localhost:8000/pedidos")
      .then((resposta) => setPedidos(resposta.data))
      .catch((erro) => console.log(erro));
  }, []);

  const excluir = (pedido: IPedido) => {
    http
      .delete("http://localhost:8000/pedidos/" + pedido.id)
      .then(() => {
        setPedidos(pedidos.filter((p) => p.id !== pedido.id));
      })
      .catch((erro) => console.log(erro));
  };

  return (
    <section className="pedidos">
      <h1>Meus pedidos</h1>
      {pedidos.map((pedido) => (
        <div className="pedido" key={pedido.id}>
          <ul>
            <li>
              Pedido: <strong>{pedido.id}</strong>
            </li>
            <li>
              Data do pedido:
              <strong>{new Date(pedido.data).toLocaleDateString()}</strong>
            </li>
            <li>
              Valor total: <strong>{formatador.format(pedido.total)}</strong>
            </li>
            <li>
              Entrega realizada em:
              <strong>{new Date(pedido.entrega).toLocaleDateString()}</strong>
            </li>
            <li>
              <button onClick={() => excluir(pedido)}>Excluir</button>
            </li>
          </ul>
          <AbBotao texto="Detalhes" />
        </div>
      ))}
    </section>
  );
};

export default Pedidos;
