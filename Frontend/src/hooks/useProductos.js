import { useEffect, useState } from 'preact/hooks';

import * as productoApi from '../services/productoApi.js';

export const useProductos = (activo = true) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const cargarProductos = async () => {
    try {
      setProductos(await productoApi.listarProductos());
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { if (activo) cargarProductos(); else { setProductos([]); setCargando(false); } }, [activo]);

  const ejecutarGuardado = async (accion) => {
    try {
      setGuardando(true);
      return await accion();
    } finally {
      setGuardando(false);
    }
  };

  const crearProducto = (datos) => ejecutarGuardado(async () => {
    const producto = await productoApi.crearProducto(datos);
    setProductos((actuales) => [...actuales, producto]);
    return producto;
  });

  const actualizarProducto = (id, datos) => ejecutarGuardado(async () => {
    const producto = await productoApi.actualizarProducto(id, datos);
    setProductos((actuales) => actuales.map((item) => item.id === producto.id ? producto : item));
    return producto;
  });

  const eliminarProducto = async (id) => {
    await productoApi.eliminarProducto(id);
    setProductos((actuales) => actuales.filter((producto) => producto.id !== id));
  };

  return { productos, cargando, guardando, crearProducto, actualizarProducto, eliminarProducto };
};
