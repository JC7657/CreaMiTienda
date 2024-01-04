import React, { FC, useState, useContext } from 'react';
import CartContext from '../context/CartContext';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';
import Prices from './Prices';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Product } from '../types';
import { ProductImage } from '../types/ProductImage';
import useFetch from '../hooks/useFetch';

export default function CartDropdown() {
    const { cart, emptyCart, addToCart, getTotalItems, removeFromCart, removeAllFromCart, getTotal } = useContext(CartContext);
    const renderProduct = (item: Product, index: number, close: () => void) => {
    const { nombre, precio, imagenURL, quantity, categoria } = item;
    

        return (
            <div key={index} className="flex py-5 last:pb-0">
                <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <img src={imagenURL} alt={nombre} className="h-full w-full object-contain object-center" />
                    <Link onClick={close} className="absolute inset-0" to="" />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                    <div>
                        <div className="flex justify-between ">
                            <div>
                                <h3 className="text-base font-medium ">
                                    <Link onClick={close} to="">
                                        {nombre}
                                    </Link>
                                </h3>
                            </div>
                            <Prices price={precio} className="mt-0.5" />
                        </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500 dark:text-slate-400">Cantidad: {quantity}</p>
                        <div className="flex">
                            <button
                                type="button"
                                className="font-medium text-primary-6000 ml-2 dark:text-primary-500"
                                onClick={() => {
                                    addToCart(item);
                                }}
                            >
                                Añadir otro
                            </button>
                            <div className="hidden md:block h-5 border-l ml-2 border-slate-200 dark:border-slate-700" />
                            <button
                                type="button"
                                className="font-medium text-primary-6000 ml-2 dark:text-primary-500"
                                onClick={() => {
                                    removeFromCart(item);
                                }}
                            >
                                Quitar
                            </button>
                            <div className="hidden md:block h-5 border-l ml-2 border-slate-200 dark:border-slate-700" />
                            <button
                                type="button"
                                className="font-medium text-primary-6000 dark:text-primary-500 ml-2"
                                onClick={() => {
                                    removeAllFromCart(item);
                                }}
                            >
                                Quitar todo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Popover className="relative">
            {({ open, close }) => (
                <>
                    <Popover.Button className={`${open ? 'bg-primary-500' : ''} bg-opacity-50 rounded p-3 m-2 transition-colors duration-150`}>
                        {getTotalItems() > 0 && (
                            <div className="w-3.5 h-3.5 flex p-2 items-center justify-center bg-primary-700 absolute top-1.5 right-1.5 rounded-full text-[10px] leading-none text-white font-medium">
                                <span className="text-white">{getTotalItems()}</span>
                            </div>
                        )}
                        <ShoppingCartIcon className={`${open ? 'text-white' : ''} w-6 h-6`} />
                        <Link className="block md:hidden absolute inset-0" to="" />
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="hidden md:block absolute z-10 w-screen max-w-xs sm:max-w-md px-4 mt-3.5 -right-28 sm:right-0 sm:px-0">
                            <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                                <div className="relative bg-white dark:bg-neutral-800">
                                    <div className="max-h-[60vh] p-5 overflow-y-auto hiddenScrollbar">
                                        <h3 className="text-neutral-900 text-xl font-semibold">Carrito de compras</h3>
                                        <div className="divide-y divide-slate-100 dark:divide-slate-700">{cart && cart.map((item, index) => renderProduct(item, index, close))}</div>
                                    </div>
                                    {cart.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center p-5">
                                            <p className="text-neutral-500 text-sm text-center">No hay productos en el carrito</p>
                                        </div>
                                    ) : (
                                        <div className="p-5">
                                            <p className="flex justify-between font-semibold text-slate-900 dark:text-slate-100">
                                                <span>
                                                    <span className="text-neutral-900">Subtotal</span>
                                                    <span className="block text-sm text-slate-500 dark:text-slate-400 font-normal">Costo de envío e impuestos calculados al momento de pagar.</span>
                                                </span>
                                                <span className="text-neutral-900">{getTotal().toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span>
                                            </p>
                                            <div className="flex space-x-2 mt-5">
                                                <ButtonSecondary href="#" className="flex-1 border border-slate-200 dark:border-slate-700" onClick={emptyCart}>
                                                    Vaciar Carro
                                                </ButtonSecondary>
                                                <ButtonPrimary href="/pago" onClick={close} className="flex-1">
                                                    Ir a Pagar
                                                </ButtonPrimary>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}
