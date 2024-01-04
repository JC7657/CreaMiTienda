import React, { createContext } from 'react';
import useFetch from '../hooks/useFetch';
import urls from '../resources/urls';

const AppContext = createContext<any>(null);
const AppContextProvider = ({ children }: any) => {
    /* let regions: any = localStorage.getItem('regions');
    if (regions === null || regions === undefined || regions === '' || regions === 'undefined') {
        const { data: reg, error: regError } = useFetch(urls.regions);
        regions = reg;
        localStorage.setItem('regions', JSON.stringify(regions));
    } else {
        regions = JSON.parse(regions);
    } */
    const regions = [
        {
          "code": "15",
          "name": "Arica y Parinacota",
          "communes": [
            {
              "code": "15101",
              "name": "Arica"
            },
            {
              "code": "15102",
              "name": "Camarones"
            },
            {
              "code": "15202",
              "name": "General Lagos"
            },
            {
              "code": "15201",
              "name": "Putre"
            }
          ]
        },
        {
          "code": "01",
          "name": "Tarapacá",
          "communes": [
            {
              "code": "01107",
              "name": "Alto Hospicio"
            },
            {
              "code": "01402",
              "name": "Camiña"
            },
            {
              "code": "01403",
              "name": "Colchane"
            },
            {
              "code": "01404",
              "name": "Huara"
            },
            {
              "code": "01101",
              "name": "Iquique"
            },
            {
              "code": "01405",
              "name": "Pica"
            },
            {
              "code": "01401",
              "name": "Pozo Almonte"
            }
          ]
        },
        {
          "code": "02",
          "name": "Antofagasta",
          "communes": [
            {
              "code": "02101",
              "name": "Antofagasta"
            },
            {
              "code": "02201",
              "name": "Calama"
            },
            {
              "code": "02302",
              "name": "María Elena"
            },
            {
              "code": "02102",
              "name": "Mejillones"
            },
            {
              "code": "02202",
              "name": "Ollagüe"
            },
            {
              "code": "02203",
              "name": "San Pedro de Atacama"
            },
            {
              "code": "02103",
              "name": "Sierra Gorda"
            },
            {
              "code": "02104",
              "name": "Taltal"
            },
            {
              "code": "02301",
              "name": "Tocopilla"
            }
          ]
        },
        {
          "code": "03",
          "name": "Atacama",
          "communes": [
            {
              "code": "03302",
              "name": "Alto del Carmen"
            },
            {
              "code": "03102",
              "name": "Caldera"
            },
            {
              "code": "03201",
              "name": "Chañaral"
            },
            {
              "code": "03101",
              "name": "Copiapó"
            },
            {
              "code": "03202",
              "name": "Diego de Almagro"
            },
            {
              "code": "03303",
              "name": "Freirina"
            },
            {
              "code": "03304",
              "name": "Huasco"
            },
            {
              "code": "03103",
              "name": "Tierra Amarilla"
            },
            {
              "code": "03301",
              "name": "Vallenar"
            }
          ]
        },
        {
          "code": "04",
          "name": "Coquimbo",
          "communes": [
            {
              "code": "04103",
              "name": "Andacollo"
            },
            {
              "code": "04202",
              "name": "Canela"
            },
            {
              "code": "04302",
              "name": "Combarbalá"
            },
            {
              "code": "04102",
              "name": "Coquimbo"
            },
            {
              "code": "04201",
              "name": "Illapel"
            },
            {
              "code": "04104",
              "name": "La Higuera"
            },
            {
              "code": "04101",
              "name": "La Serena"
            },
            {
              "code": "04203",
              "name": "Los Vilos"
            },
            {
              "code": "04303",
              "name": "Monte Patria"
            },
            {
              "code": "04301",
              "name": "Ovalle"
            },
            {
              "code": "04105",
              "name": "Paiguano"
            },
            {
              "code": "04304",
              "name": "Punitaqui"
            },
            {
              "code": "04305",
              "name": "Río Hurtado"
            },
            {
              "code": "04204",
              "name": "Salamanca"
            },
            {
              "code": "04106",
              "name": "Vicuña"
            }
          ]
        },
        {
          "code": "05",
          "name": "Valparaíso",
          "communes": [
            {
              "code": "05602",
              "name": "Algarrobo"
            },
            {
              "code": "05402",
              "name": "Cabildo"
            },
            {
              "code": "05502",
              "name": "Calera"
            },
            {
              "code": "05302",
              "name": "Calle Larga"
            },
            {
              "code": "05603",
              "name": "Cartagena"
            },
            {
              "code": "05102",
              "name": "Casablanca"
            },
            {
              "code": "05702",
              "name": "Catemu"
            },
            {
              "code": "05103",
              "name": "Concón"
            },
            {
              "code": "05604",
              "name": "El Quisco"
            },
            {
              "code": "05605",
              "name": "El Tabo"
            },
            {
              "code": "05503",
              "name": "Hijuelas"
            },
            {
              "code": "05201",
              "name": "Isla de Pascua"
            },
            {
              "code": "05104",
              "name": "Juan Fernández"
            },
            {
              "code": "05504",
              "name": "La Cruz"
            },
            {
              "code": "05401",
              "name": "La Ligua"
            },
            {
              "code": "05802",
              "name": "Limache"
            },
            {
              "code": "05703",
              "name": "Llaillay"
            },
            {
              "code": "05301",
              "name": "Los Andes"
            },
            {
              "code": "05506",
              "name": "Nogales"
            },
            {
              "code": "05803",
              "name": "Olmué"
            },
            {
              "code": "05704",
              "name": "Panquehue"
            },
            {
              "code": "05403",
              "name": "Papudo"
            },
            {
              "code": "05404",
              "name": "Petorca"
            },
            {
              "code": "05105",
              "name": "Puchuncaví"
            },
            {
              "code": "05705",
              "name": "Putaendo"
            },
            {
              "code": "05501",
              "name": "Quillota"
            },
            {
              "code": "05801",
              "name": "Quilpué"
            },
            {
              "code": "05107",
              "name": "Quintero"
            },
            {
              "code": "05303",
              "name": "Rinconada"
            },
            {
              "code": "05601",
              "name": "San Antonio"
            },
            {
              "code": "05304",
              "name": "San Esteban"
            },
            {
              "code": "05701",
              "name": "San Felipe"
            },
            {
              "code": "05706",
              "name": "Santa María"
            },
            {
              "code": "05606",
              "name": "Santo Domingo"
            },
            {
              "code": "05101",
              "name": "Valparaíso"
            },
            {
              "code": "05804",
              "name": "Villa Alemana"
            },
            {
              "code": "05109",
              "name": "Viña del Mar"
            },
            {
              "code": "05405",
              "name": "Zapallar"
            }
          ]
        },
        {
          "code": "13",
          "name": "Metropolitana de Santiago",
          "communes": [
            {
              "code": "13502",
              "name": "Alhué"
            },
            {
              "code": "13402",
              "name": "Buin"
            },
            {
              "code": "13403",
              "name": "Calera de Tango"
            },
            {
              "code": "13102",
              "name": "Cerrillos"
            },
            {
              "code": "13103",
              "name": "Cerro Navia"
            },
            {
              "code": "13301",
              "name": "Colina"
            },
            {
              "code": "13104",
              "name": "Conchalí"
            },
            {
              "code": "13503",
              "name": "Curacaví"
            },
            {
              "code": "13105",
              "name": "El Bosque"
            },
            {
              "code": "13602",
              "name": "El Monte"
            },
            {
              "code": "13106",
              "name": "Estación Central"
            },
            {
              "code": "13107",
              "name": "Huechuraba"
            },
            {
              "code": "13108",
              "name": "Independencia"
            },
            {
              "code": "13603",
              "name": "Isla de Maipo"
            },
            {
              "code": "13109",
              "name": "La Cisterna"
            },
            {
              "code": "13110",
              "name": "La Florida"
            },
            {
              "code": "13111",
              "name": "La Granja"
            },
            {
              "code": "13112",
              "name": "La Pintana"
            },
            {
              "code": "13113",
              "name": "La Reina"
            },
            {
              "code": "13302",
              "name": "Lampa"
            },
            {
              "code": "13114",
              "name": "Las Condes"
            },
            {
              "code": "13115",
              "name": "Lo Barnechea"
            },
            {
              "code": "13116",
              "name": "Lo Espejo"
            },
            {
              "code": "13117",
              "name": "Lo Prado"
            },
            {
              "code": "13118",
              "name": "Macul"
            },
            {
              "code": "13119",
              "name": "Maipú"
            },
            {
              "code": "13504",
              "name": "María Pinto"
            },
            {
              "code": "13501",
              "name": "Melipilla"
            },
            {
              "code": "13120",
              "name": "Ñuñoa"
            },
            {
              "code": "13604",
              "name": "Padre Hurtado"
            },
            {
              "code": "13404",
              "name": "Paine"
            },
            {
              "code": "13121",
              "name": "Pedro Aguirre Cerda"
            },
            {
              "code": "13605",
              "name": "Peñaflor"
            },
            {
              "code": "13122",
              "name": "Peñalolén"
            },
            {
              "code": "13202",
              "name": "Pirque"
            },
            {
              "code": "13123",
              "name": "Providencia"
            },
            {
              "code": "13124",
              "name": "Pudahuel"
            },
            {
              "code": "13201",
              "name": "Puente Alto"
            },
            {
              "code": "13125",
              "name": "Quilicura"
            },
            {
              "code": "13126",
              "name": "Quinta Normal"
            },
            {
              "code": "13127",
              "name": "Recoleta"
            },
            {
              "code": "13128",
              "name": "Renca"
            },
            {
              "code": "13401",
              "name": "San Bernardo"
            },
            {
              "code": "13129",
              "name": "San Joaquín"
            },
            {
              "code": "13203",
              "name": "San José de Maipo"
            },
            {
              "code": "13130",
              "name": "San Miguel"
            },
            {
              "code": "13505",
              "name": "San Pedro"
            },
            {
              "code": "13131",
              "name": "San Ramón"
            },
            {
              "code": "13101",
              "name": "Santiago Centro"
            },
            {
              "code": "13601",
              "name": "Talagante"
            },
            {
              "code": "13303",
              "name": "Tiltil"
            },
            {
              "code": "13132",
              "name": "Vitacura"
            }
          ]
        },
        {
          "code": "06",
          "name": "Del Libertador Gral. Bernardo O’Higgins",
          "communes": [
            {
              "code": "06302",
              "name": "Chépica"
            },
            {
              "code": "06303",
              "name": "Chimbarongo"
            },
            {
              "code": "06102",
              "name": "Codegua"
            },
            {
              "code": "06103",
              "name": "Coinco"
            },
            {
              "code": "06104",
              "name": "Coltauco"
            },
            {
              "code": "06105",
              "name": "Doñihue"
            },
            {
              "code": "06106",
              "name": "Graneros"
            },
            {
              "code": "06202",
              "name": "La Estrella"
            },
            {
              "code": "06107",
              "name": "Las Cabras"
            },
            {
              "code": "06203",
              "name": "Litueche"
            },
            {
              "code": "06304",
              "name": "Lolol"
            },
            {
              "code": "06108",
              "name": "Machalí"
            },
            {
              "code": "06109",
              "name": "Malloa"
            },
            {
              "code": "06204",
              "name": "Marchihue"
            },
            {
              "code": "06110",
              "name": "Mostazal"
            },
            {
              "code": "06305",
              "name": "Nancagua"
            },
            {
              "code": "06205",
              "name": "Navidad"
            },
            {
              "code": "06111",
              "name": "Olivar"
            },
            {
              "code": "06306",
              "name": "Palmilla"
            },
            {
              "code": "06206",
              "name": "Paredones"
            },
            {
              "code": "06307",
              "name": "Peralillo"
            },
            {
              "code": "06112",
              "name": "Peumo"
            },
            {
              "code": "06113",
              "name": "Pichidegua"
            },
            {
              "code": "06201",
              "name": "Pichilemu"
            },
            {
              "code": "06308",
              "name": "Placilla"
            },
            {
              "code": "06309",
              "name": "Pumanque"
            },
            {
              "code": "06114",
              "name": "Quinta de Tilcoco"
            },
            {
              "code": "06101",
              "name": "Rancagua"
            },
            {
              "code": "06115",
              "name": "Rengo"
            },
            {
              "code": "06116",
              "name": "Requínoa"
            },
            {
              "code": "06301",
              "name": "San Fernando"
            },
            {
              "code": "06117",
              "name": "San Vicente"
            },
            {
              "code": "06310",
              "name": "Santa Cruz"
            }
          ]
        },
        {
          "code": "07",
          "name": "Del Maule",
          "communes": [
            {
              "code": "07201",
              "name": "Cauquenes"
            },
            {
              "code": "07202",
              "name": "Chanco"
            },
            {
              "code": "07402",
              "name": "Colbún"
            },
            {
              "code": "07102",
              "name": "Constitución"
            },
            {
              "code": "07103",
              "name": "Curepto"
            },
            {
              "code": "07301",
              "name": "Curicó"
            },
            {
              "code": "07104",
              "name": "Empedrado"
            },
            {
              "code": "07302",
              "name": "Hualañé"
            },
            {
              "code": "07303",
              "name": "Licantén"
            },
            {
              "code": "07401",
              "name": "Linares"
            },
            {
              "code": "07403",
              "name": "Longaví"
            },
            {
              "code": "07105",
              "name": "Maule"
            },
            {
              "code": "07304",
              "name": "Molina"
            },
            {
              "code": "07404",
              "name": "Parral"
            },
            {
              "code": "07106",
              "name": "Pelarco"
            },
            {
              "code": "07203",
              "name": "Pelluhue"
            },
            {
              "code": "07107",
              "name": "Pencahue"
            },
            {
              "code": "07305",
              "name": "Rauco"
            },
            {
              "code": "07405",
              "name": "Retiro"
            },
            {
              "code": "07108",
              "name": "Río Claro"
            },
            {
              "code": "07306",
              "name": "Romeral"
            },
            {
              "code": "07307",
              "name": "Sagrada Familia"
            },
            {
              "code": "07109",
              "name": "San Clemente"
            },
            {
              "code": "07406",
              "name": "San Javier"
            },
            {
              "code": "07110",
              "name": "San Rafael"
            },
            {
              "code": "07101",
              "name": "Talca"
            },
            {
              "code": "07308",
              "name": "Teno"
            },
            {
              "code": "07309",
              "name": "Vichuquén"
            },
            {
              "code": "07407",
              "name": "Villa Alegre"
            },
            {
              "code": "07408",
              "name": "Yerbas Buenas"
            }
          ]
        },
        {
          "code": "08",
          "name": "Del Biobío",
          "communes": [
            {
              "code": "08314",
              "name": "Alto Biobío"
            },
            {
              "code": "08302",
              "name": "Antuco"
            },
            {
              "code": "08202",
              "name": "Arauco"
            },
            {
              "code": "08303",
              "name": "Cabrero"
            },
            {
              "code": "08203",
              "name": "Cañete"
            },
            {
              "code": "08103",
              "name": "Chiguayante"
            },
            {
              "code": "08101",
              "name": "Concepción"
            },
            {
              "code": "08204",
              "name": "Contulmo"
            },
            {
              "code": "08102",
              "name": "Coronel"
            },
            {
              "code": "08205",
              "name": "Curanilahue"
            },
            {
              "code": "08104",
              "name": "Florida"
            },
            {
              "code": "08112",
              "name": "Hualpén"
            },
            {
              "code": "08105",
              "name": "Hualqui"
            },
            {
              "code": "08304",
              "name": "Laja"
            },
            {
              "code": "08201",
              "name": "Lebu"
            },
            {
              "code": "08206",
              "name": "Los Álamos"
            },
            {
              "code": "08301",
              "name": "Los Ángeles"
            },
            {
              "code": "08106",
              "name": "Lota"
            },
            {
              "code": "08305",
              "name": "Mulchén"
            },
            {
              "code": "08306",
              "name": "Nacimiento"
            },
            {
              "code": "08307",
              "name": "Negrete"
            },
            {
              "code": "08107",
              "name": "Penco"
            },
            {
              "code": "08308",
              "name": "Quilaco"
            },
            {
              "code": "08309",
              "name": "Quilleco"
            },
            {
              "code": "08108",
              "name": "San Pedro de la Paz"
            },
            {
              "code": "08310",
              "name": "San Rosendo"
            },
            {
              "code": "08311",
              "name": "Santa Bárbara"
            },
            {
              "code": "08109",
              "name": "Santa Juana"
            },
            {
              "code": "08110",
              "name": "Talcahuano"
            },
            {
              "code": "08207",
              "name": "Tirúa"
            },
            {
              "code": "08111",
              "name": "Tomé"
            },
            {
              "code": "08312",
              "name": "Tucapel"
            },
            {
              "code": "08313",
              "name": "Yumbel"
            }
          ]
        },
        {
          "code": "09",
          "name": "De la Araucanía",
          "communes": [
            {
              "code": "09201",
              "name": "Angol"
            },
            {
              "code": "09102",
              "name": "Carahue"
            },
            {
              "code": "09121",
              "name": "Cholchol"
            },
            {
              "code": "09202",
              "name": "Collipulli"
            },
            {
              "code": "09103",
              "name": "Cunco"
            },
            {
              "code": "09203",
              "name": "Curacautín"
            },
            {
              "code": "09104",
              "name": "Curarrehue"
            },
            {
              "code": "09204",
              "name": "Ercilla"
            },
            {
              "code": "09105",
              "name": "Freire"
            },
            {
              "code": "09106",
              "name": "Galvarino"
            },
            {
              "code": "09107",
              "name": "Gorbea"
            },
            {
              "code": "09108",
              "name": "Lautaro"
            },
            {
              "code": "09109",
              "name": "Loncoche"
            },
            {
              "code": "09205",
              "name": "Lonquimay"
            },
            {
              "code": "09206",
              "name": "Los Sauces"
            },
            {
              "code": "09207",
              "name": "Lumaco"
            },
            {
              "code": "09110",
              "name": "Melipeuco"
            },
            {
              "code": "09111",
              "name": "Nueva Imperial"
            },
            {
              "code": "09112",
              "name": "Padre las Casas"
            },
            {
              "code": "09113",
              "name": "Perquenco"
            },
            {
              "code": "09114",
              "name": "Pitrufquén"
            },
            {
              "code": "09115",
              "name": "Pucón"
            },
            {
              "code": "09208",
              "name": "Purén"
            },
            {
              "code": "09209",
              "name": "Renaico"
            },
            {
              "code": "09116",
              "name": "Saavedra"
            },
            {
              "code": "09101",
              "name": "Temuco"
            },
            {
              "code": "09117",
              "name": "Teodoro Schmidt"
            },
            {
              "code": "09118",
              "name": "Toltén"
            },
            {
              "code": "09210",
              "name": "Traiguén"
            },
            {
              "code": "09211",
              "name": "Victoria"
            },
            {
              "code": "09119",
              "name": "Vilcún"
            },
            {
              "code": "09120",
              "name": "Villarrica"
            }
          ]
        },
        {
          "code": "14",
          "name": "De los Ríos",
          "communes": [
            {
              "code": "14102",
              "name": "Corral"
            },
            {
              "code": "14202",
              "name": "Futrono"
            },
            {
              "code": "14201",
              "name": "La Unión"
            },
            {
              "code": "14203",
              "name": "Lago Ranco"
            },
            {
              "code": "14103",
              "name": "Lanco"
            },
            {
              "code": "14104",
              "name": "Los Lagos"
            },
            {
              "code": "14105",
              "name": "Máfil"
            },
            {
              "code": "14106",
              "name": "Mariquina"
            },
            {
              "code": "14107",
              "name": "Paillaco"
            },
            {
              "code": "14108",
              "name": "Panguipulli"
            },
            {
              "code": "14204",
              "name": "Río Bueno"
            },
            {
              "code": "14101",
              "name": "Valdivia"
            }
          ]
        },
        {
          "code": "10",
          "name": "De los Lagos",
          "communes": [
            {
              "code": "10202",
              "name": "Ancud"
            },
            {
              "code": "10102",
              "name": "Calbuco"
            },
            {
              "code": "10201",
              "name": "Castro"
            },
            {
              "code": "10401",
              "name": "Chaitén"
            },
            {
              "code": "10203",
              "name": "Chonchi"
            },
            {
              "code": "10103",
              "name": "Cochamó"
            },
            {
              "code": "10204",
              "name": "Curaco de Vélez"
            },
            {
              "code": "10205",
              "name": "Dalcahue"
            },
            {
              "code": "10104",
              "name": "Fresia"
            },
            {
              "code": "10105",
              "name": "Frutillar"
            },
            {
              "code": "10402",
              "name": "Futaleufú"
            },
            {
              "code": "10403",
              "name": "Hualaihué"
            },
            {
              "code": "10107",
              "name": "Llanquihue"
            },
            {
              "code": "10106",
              "name": "Los Muermos"
            },
            {
              "code": "10108",
              "name": "Maullín"
            },
            {
              "code": "10301",
              "name": "Osorno"
            },
            {
              "code": "10404",
              "name": "Palena"
            },
            {
              "code": "10101",
              "name": "Puerto Montt"
            },
            {
              "code": "10302",
              "name": "Puerto Octay"
            },
            {
              "code": "10109",
              "name": "Puerto Varas"
            },
            {
              "code": "10206",
              "name": "Puqueldón"
            },
            {
              "code": "10303",
              "name": "Purranque"
            },
            {
              "code": "10304",
              "name": "Puyehue"
            },
            {
              "code": "10207",
              "name": "Queilén"
            },
            {
              "code": "10208",
              "name": "Quellón"
            },
            {
              "code": "10209",
              "name": "Quemchi"
            },
            {
              "code": "10210",
              "name": "Quinchao"
            },
            {
              "code": "10305",
              "name": "Río Negro"
            },
            {
              "code": "10306",
              "name": "San Juan de la Costa"
            },
            {
              "code": "10307",
              "name": "San Pablo"
            }
          ]
        },
        {
          "code": "11",
          "name": "Aysén del Gral. Carlos Ibáñez del Campo",
          "communes": [
            {
              "code": "11201",
              "name": "Aysén"
            },
            {
              "code": "11401",
              "name": "Chile Chico"
            },
            {
              "code": "11202",
              "name": "Cisnes"
            },
            {
              "code": "11301",
              "name": "Cochrane"
            },
            {
              "code": "11101",
              "name": "Coihaique"
            },
            {
              "code": "11203",
              "name": "Guaitecas"
            },
            {
              "code": "11102",
              "name": "Lago Verde"
            },
            {
              "code": "11302",
              "name": "O’Higgins"
            },
            {
              "code": "11402",
              "name": "Río Ibáñez"
            },
            {
              "code": "11303",
              "name": "Tortel"
            }
          ]
        },
        {
          "code": "12",
          "name": "Magallanes y de la Antártica Chilena",
          "communes": [
            {
              "code": "12202",
              "name": "Antártica"
            },
            {
              "code": "12201",
              "name": "Cabo de Hornos"
            },
            {
              "code": "12102",
              "name": "Laguna Blanca"
            },
            {
              "code": "12401",
              "name": "Natales"
            },
            {
              "code": "12301",
              "name": "Porvenir"
            },
            {
              "code": "12302",
              "name": "Primavera"
            },
            {
              "code": "12101",
              "name": "Punta Arenas"
            },
            {
              "code": "12103",
              "name": "Río Verde"
            },
            {
              "code": "12104",
              "name": "San Gregorio"
            },
            {
              "code": "12303",
              "name": "Timaukel"
            },
            {
              "code": "12402",
              "name": "Torres del Paine"
            }
          ]
        },
        {
          "code": "16",
          "name": "Ñuble",
          "communes": [
            {
              "code": "16102",
              "name": "Bulnes"
            },
            {
              "code": "16101",
              "name": "Chillán"
            },
            {
              "code": "16103",
              "name": "Chillán Viejo"
            },
            {
              "code": "16202",
              "name": "Cobquecura"
            },
            {
              "code": "16203",
              "name": "Coelemu"
            },
            {
              "code": "16302",
              "name": "Coihueco"
            },
            {
              "code": "16104",
              "name": "El Carmen"
            },
            {
              "code": "16204",
              "name": "Ninhue"
            },
            {
              "code": "16303",
              "name": "Ñiquén"
            },
            {
              "code": "16105",
              "name": "Pemuco"
            },
            {
              "code": "16106",
              "name": "Pinto"
            },
            {
              "code": "16205",
              "name": "Portezuelo"
            },
            {
              "code": "16107",
              "name": "Quillón"
            },
            {
              "code": "16201",
              "name": "Quirihue"
            },
            {
              "code": "16206",
              "name": "Ránquil"
            },
            {
              "code": "16301",
              "name": "San Carlos"
            },
            {
              "code": "16304",
              "name": "San Fabián"
            },
            {
              "code": "16108",
              "name": "San Ignacio"
            },
            {
              "code": "16305",
              "name": "San Nicolás"
            },
            {
              "code": "16207",
              "name": "Treguaco"
            },
            {
              "code": "16109",
              "name": "Yungay"
            }
          ]
        }
      ]
    return (
        <AppContext.Provider
            value={{
                regions,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };

export default AppContext;
