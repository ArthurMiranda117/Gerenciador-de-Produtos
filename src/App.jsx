import { useState, useEffect } from 'react';
import './index.css';
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Produtos from "./pages/produto/listagem_produto";
import Cadastro from './pages/produto/cadastro_produto';
import EditarProduto from './pages/produto/editar_produto';
import Fornecedor from './pages/fornecedor/listagem_fornecedor';
import CadastroFornecedor from './pages/fornecedor/cadastro_fornecedor';
import EditarFornecedor from './pages/fornecedor/editar_fornecedor';
import Vendas from './pages/venda/listagem_venda';
import CadastroVenda from './pages/venda/cadastro_venda';
import EditarVenda from './pages/venda/editar_venda';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/Home" className="btn">Home</Link></li>
          <li><Link to="/Produtos" className="btn">Produtos</Link></li>
          <li><Link to="/Fornecedor" className="btn">Fornecedor</Link></li>
          <li><Link to="/Vendas" className="btn">Venda</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />}/>
        <Route path="/Home" element={<Home />}/>
        <Route path="/Produtos" element={<Produtos />}/>
        <Route path="/cadastroProduto" element={<Cadastro />}/>
        <Route path="/EditarProduto/:id" element={<EditarProduto/>}/>
        <Route path="/Fornecedor" element={<Fornecedor />}/>
        <Route path="/CadastroFornecedor" element={<CadastroFornecedor />}/>
        <Route path="/EditarFornecedor/:id" element={<EditarFornecedor/>}/>
        <Route path="/Vendas" element={<Vendas />}/>
        <Route path="/CadastroVenda" element={<CadastroVenda />}/>
        <Route path="/EditarVenda/:id" element={<EditarVenda/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;