import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion as Motion } from "framer-motion";
import { useContext } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AuthContext from '../Provider/AuthContext';

const MySwal = withReactContent(Swal);


const ProductsDetails = () => {
  const { id } = useParams();
  const [product, setProducts] = useState();
  const { user } = useContext(AuthContext);


  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error("Error fetching task:", error.message);
      });
  }, [id]);
  if (!product) return <div className="text-center py-20">Loading...</div>;

  //cart popUp********************************
  const handleCartPopup = (product) => {
    let quantity = 1;

    MySwal.fire({
      title: <strong>{product.title}</strong>,
      html: `
      <img src="${product.image}" alt="${product.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px;" />
      <p style="margin-top: 10px;">Price: <strong>৳ ${product.price || 0}</strong></p>
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 10px;">
        <button id="decrease" style="padding: 5px 10px;">-</button>
        <span id="quantity">${quantity}</span>
        <button id="increase" style="padding: 5px 10px;">+</button>
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: 'Add to Cart',
      focusConfirm: false,
      customClass: {
        popup: 'swal-wide-modal'
      },
      preConfirm: () => {
        const qty = parseInt(document.getElementById('quantity').textContent);
        return { quantity: qty };
      },
      didOpen: () => {
        const qtyDisplay = document.getElementById('quantity');
        const incBtn = document.getElementById('increase');
        const decBtn = document.getElementById('decrease');

        incBtn.addEventListener('click', () => {
          quantity++;
          qtyDisplay.textContent = quantity;
        });

        decBtn.addEventListener('click', () => {
          if (quantity > 1) {
            quantity--;
            qtyDisplay.textContent = quantity;
          }
        });
      }
    }).then(result => {
      if (result.isConfirmed) {
        const cartItem = {
          title: product.title,
          genre: product.genre,
          duration: product.duration,
          releaseYear: product.releaseYear,
          rating: product.rating,
          url: product.url,
          price: product.price || 0,
          email: user?.email,
          quantity: result.value.quantity,
          image: product.image,
        };

        fetch('http://localhost:5000/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cartItem)
        })
          .then(res => res.json())
          .then(data => {
            if (data.insertedId) {
              Swal.fire(' Added!', `${product.title} added to cart.`, 'success');
            } else {
              Swal.fire(' Error', 'Failed to add to cart.', 'error');
            }
          })
          .catch(() => {
            Swal.fire(' Server Error', 'Please try again later.', 'error');
          });
      }
    });
  };

  //wishlist
  const handleWishlist = (productW) => {
    console.log(productW);
    const wishListItem = {
      title: productW.title,
      rating: productW.rating,
      category: productW.category,
      price: productW.price || 0,
      image: productW.image,
      email: user?.email,
    };

    fetch('http://localhost:5000/wish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wishListItem)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          Swal.fire(' Added!', `${product.title} added to your wishlist.`, 'success');
        } else {
          Swal.fire(' Error', 'Failed to add to cart.', 'error');
        }
      })

  }

  return (
    <div className='p-5 text-xl'>
      <Motion.h1
        animate={{ color: ['#D69ADE', '#BA487F', '#A2AADB'] }}
        transition={{ duration: 2, repeat: Infinity }}
        className='text-4xl text-center font-bold mb-8'
      >
        Product Details
      </Motion.h1>
      <Motion.div
        className="bg-gradient-to-br from-violet-100 via-white to-violet-200 max-w-5xl mx-auto mt-10 p-8 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Main section */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="group relative w-full h-96 overflow-hidden rounded-lg border">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-150"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">{product.title}</h2>
            <p className="text-gray-600 text-sm">Category: <span className="font-medium">{product.category}</span></p>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-2xl font-semibold text-purple-700">৳ {product.price}</p>
            <p className="text-sm">Stock: <span className={product.stock > 0 ? 'text-purple-600 font-bold' : 'text-red-600'}>{product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}</span></p>
            <p className="text-sm text-gray-600">Seller: <span className="font-medium">{product.name}</span></p>
            <p className="text-sm text-gray-600">Email: {product.email}</p>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                className="bg-gradient-to-br cursor-pointer from-violet-100 to-violet-300 text-black px-4 py-2 rounded hover:bg-blue-700 transition-all"
                onClick={() => handleCartPopup(product)}
              >
                Add to Cart
              </button>

              <button className="bg-gradient-to-br cursor-pointer
             from-violet-300 to-violet-100 px-4 py-2 rounded
              hover:bg-blue-100 transition-all"
                onClick={() => handleWishlist(product)}
              >
                Wishlist
              </button>
              <Link to="/buy" state={{ product: product }}>
                <button
                  className="bg-gradient-to-br cursor-pointer from-violet-100 to-violet-300 text-black px-4 py-2 rounded hover:bg-green-700 transition-all"
                >Buy Now
                </button>
              </Link>

            </div>
          </div>
        </div>
      </Motion.div>

    </div>
  );
};

export default ProductsDetails;