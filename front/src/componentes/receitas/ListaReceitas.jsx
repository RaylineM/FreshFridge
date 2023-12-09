import React, { useState, useEffect } from 'react';
import './ListaReceitas.css';
import Axios from 'axios';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from '@material-ui/core';
import HeaderDasboard from '../header_dashboard/header_dashboard';
import Footer from '../footer/Footer';
import TokenExpiredModal from '../modal_token/TokenExpiredModal';
import { useNavigate } from 'react-router-dom';

const APP_ID = '6c8b6809';
const APP_KEY = '8e2cb724efd190869ad4a7c4fb6fd17e';
const GOOGLE_TRANSLATE_API_KEY = 'AIzaSyBFbFIbR9cn2eJhw9dRUVO4qWdQQClKvDk';

const defaultSearchTerms = ['chicken', 'egg', 'cheese'];

function Receitas() {
  const navigate = useNavigate();
  const [timeoutId, updateTimeoutId] = useState();
  const [receitaLista, updateReceitaLista] = useState([]);
  const [searchString, updateSearchString] = useState('');
  const [show, setShow] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const translateText = async (text, sourceLang, targetLang) => {
    const translateUrl = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`;
    const translateBody = {
      q: text,
      source: sourceLang,
      target: targetLang,
    };

    const response = await Axios.post(translateUrl, translateBody);

    return response.data.data.translations[0].translatedText;
  };

  const translateRecipeName = async (recipe) => {
    try {
      const translatedText = await translateText(recipe.recipe.label, 'en', 'pt');
      return translatedText;
    } catch (error) {
      console.error('Erro ao traduzir o nome da receita:', error);
      return recipe.recipe.label;
    }
  };

  const translateIngredients = async (ingredients) => {
    const translatedIngredients = await Promise.all(
      ingredients.map(async (ingredient) => {
        try {
          const translatedText = await translateText(ingredient.text, 'en', 'pt');
          return { ...ingredient, translatedText };
        } catch (error) {
          console.error('Erro ao traduzir o ingrediente:', error);
          return ingredient;
        }
      })
    );

    return translatedIngredients;
  };

  const fetchReceita = async (query) => {
    try {
      const response = await Axios.get(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );

      const translatedRecipes = await Promise.all(
        response.data.hits.map(async (receita) => {
          const translatedName = await translateRecipeName(receita);
          return { ...receita, translatedName };
        })
      );

      updateReceitaLista(translatedRecipes);
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
      checkTokenExpiration(error);
    }
  };

  const onTextChange = (event) => {
    updateSearchString(event.target.value);
  };

  const openIngredientsModal = async (recipe) => {
    const translatedIngredients = await translateIngredients(recipe.ingredients);
    setSelectedRecipe({ ...recipe, translatedIngredients });
    setShow(true);
  };

  const closeIngredientsModal = () => {
    setSelectedRecipe(null);
    setShow(false);
  };

 
  const checkTokenExpiration = (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Redirecionando para a página inicial...');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const redirect = () => {
    navigate('/');
  };

  useEffect(() => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => {
      if (searchString === '') {
        defaultSearchTerms.forEach((term) => fetchReceita(term));
      } else {
        fetchReceita(searchString);
      }
    }, 500);
    updateTimeoutId(timeout);
  }, [searchString]);

  return (
    <>
    <HeaderDasboard/>
    <div>
      <div className="search-component">
        <img className="search-icon" src="imagens/icon-search.svg" alt="Search Icon" />
        <input
          className="search-input"
          placeholder="Pesquise uma receita"
          onChange={onTextChange}
        />
      </div>

      <div className="receitas-lista-container">
        {receitaLista?.length ? (
          receitaLista.map((receita, index) => (
            <div key={index} className="receitasContainer">
              <img className="imagem-cover" src={receita.recipe.image} alt={receita.translatedName} />
              <span className="nome-receita">{receita.translatedName}</span>
              <span className="ingredientes-texto" onClick={() => openIngredientsModal(receita.recipe)}>Ingredientes</span>
              <span className="ver-mais-texto" onClick={() => window.open(receita.recipe.url)}>Ver receita completa</span>
              
            </div>
          ))
        ) : (
          <img src="imagens/Recipe book-rafiki.svg" className="placeholder" />
        )}
      </div>

      {selectedRecipe && (
        <Dialog
          onClose={closeIngredientsModal}
          aria-labelledby="simple-dialog-title"
          open={show}
        >
          <DialogTitle>Ingredientes</DialogTitle>
          <DialogContent>
            <span>{selectedRecipe.translatedName}</span>
            <table>
              <thead>
                <th>Ingrediente</th>
                <th>Peso</th>
              </thead>
              <tbody>
                {selectedRecipe.translatedIngredients.map((ingredient, index) => (
                  <tr key={index}>
                    <td>{ingredient.translatedText}</td>
                    <td>{Number(ingredient.weight).toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <DialogActions>
              <span
                className="ingredientes-texto"
                onClick={() => window.open(selectedRecipe.url)}
              >
                Ver Mais
              </span>
              <span
                className="ver-mais-texto"
                onClick={closeIngredientsModal}
              >
                Fechar
              </span>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}

      {showModal && (
        <TokenExpiredModal closeModal={closeModal} redirect={redirect} />
      )}
    </div>
    <Footer/>
    </>
  );
}

export default Receitas;
