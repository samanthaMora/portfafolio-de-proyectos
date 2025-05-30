PGDMP  ;    7                }            proyect_jwt    17.4    17.4 ^    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16405    proyect_jwt    DATABASE     q   CREATE DATABASE proyect_jwt WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'es-ES';
    DROP DATABASE proyect_jwt;
                     postgres    false            �            1259    16619    calificaciones    TABLE       CREATE TABLE public.calificaciones (
    id integer NOT NULL,
    id_usuario integer,
    id_proyecto integer,
    valor integer,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT calificaciones_valor_check CHECK (((valor >= 1) AND (valor <= 5)))
);
 "   DROP TABLE public.calificaciones;
       public         heap r       postgres    false            �           0    0    TABLE calificaciones    ACL     4   GRANT ALL ON TABLE public.calificaciones TO oliver;
          public               postgres    false    235            �            1259    16618    calificaciones_id_seq    SEQUENCE     �   CREATE SEQUENCE public.calificaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.calificaciones_id_seq;
       public               postgres    false    235            �           0    0    calificaciones_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.calificaciones_id_seq OWNED BY public.calificaciones.id;
          public               postgres    false    234            �            1259    16495 
   categorias    TABLE     h   CREATE TABLE public.categorias (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);
    DROP TABLE public.categorias;
       public         heap r       postgres    false            �           0    0    TABLE categorias    ACL     0   GRANT ALL ON TABLE public.categorias TO oliver;
          public               postgres    false    222            �            1259    16494    categorias_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categorias_id_seq;
       public               postgres    false    222            �           0    0    categorias_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;
          public               postgres    false    221            �            1259    16593    comentarios    TABLE     .  CREATE TABLE public.comentarios (
    id integer NOT NULL,
    id_proyecto integer NOT NULL,
    id_usuario integer NOT NULL,
    contenido text NOT NULL,
    fecha timestamp without time zone DEFAULT now(),
    CONSTRAINT comentarios_contenido_check CHECK ((length(TRIM(BOTH FROM contenido)) > 0))
);
    DROP TABLE public.comentarios;
       public         heap r       postgres    false            �           0    0    TABLE comentarios    ACL     1   GRANT ALL ON TABLE public.comentarios TO oliver;
          public               postgres    false    232            �            1259    16592    comentarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comentarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.comentarios_id_seq;
       public               postgres    false    232            �           0    0    comentarios_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.comentarios_id_seq OWNED BY public.comentarios.id;
          public               postgres    false    231            �            1259    16504 	   etiquetas    TABLE     g   CREATE TABLE public.etiquetas (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);
    DROP TABLE public.etiquetas;
       public         heap r       postgres    false            �           0    0    TABLE etiquetas    ACL     /   GRANT ALL ON TABLE public.etiquetas TO oliver;
          public               postgres    false    224            �            1259    16503    etiquetas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.etiquetas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.etiquetas_id_seq;
       public               postgres    false    224            �           0    0    etiquetas_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.etiquetas_id_seq OWNED BY public.etiquetas.id;
          public               postgres    false    223            �            1259    16407    login    TABLE       CREATE TABLE public.login (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    verificado boolean DEFAULT false,
    token_verificacion text,
    token_recuperacion text
);
    DROP TABLE public.login;
       public         heap r       postgres    false            �            1259    16406    login_id_seq    SEQUENCE     �   CREATE SEQUENCE public.login_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.login_id_seq;
       public               postgres    false    218            �           0    0    login_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.login_id_seq OWNED BY public.login.id;
          public               postgres    false    217            �            1259    16521    proyecto_categorias    TABLE     q   CREATE TABLE public.proyecto_categorias (
    id_proyecto integer NOT NULL,
    id_categoria integer NOT NULL
);
 '   DROP TABLE public.proyecto_categorias;
       public         heap r       postgres    false            �           0    0    TABLE proyecto_categorias    ACL     9   GRANT ALL ON TABLE public.proyecto_categorias TO oliver;
          public               postgres    false    227            �            1259    16536    proyecto_etiquetas    TABLE     o   CREATE TABLE public.proyecto_etiquetas (
    id_proyecto integer NOT NULL,
    id_etiqueta integer NOT NULL
);
 &   DROP TABLE public.proyecto_etiquetas;
       public         heap r       postgres    false            �           0    0    TABLE proyecto_etiquetas    ACL     8   GRANT ALL ON TABLE public.proyecto_etiquetas TO oliver;
          public               postgres    false    228            �            1259    16551    proyecto_tecnologias    TABLE     s   CREATE TABLE public.proyecto_tecnologias (
    id_proyecto integer NOT NULL,
    id_tecnologia integer NOT NULL
);
 (   DROP TABLE public.proyecto_tecnologias;
       public         heap r       postgres    false            �           0    0    TABLE proyecto_tecnologias    ACL     :   GRANT ALL ON TABLE public.proyecto_tecnologias TO oliver;
          public               postgres    false    229            �            1259    16418 	   proyectos    TABLE     )  CREATE TABLE public.proyectos (
    id integer NOT NULL,
    id_usuario integer NOT NULL,
    titulo character varying(100) NOT NULL,
    descripcion text,
    url text,
    fecha_creacion timestamp without time zone DEFAULT now(),
    repositorio_github text,
    publico boolean DEFAULT true
);
    DROP TABLE public.proyectos;
       public         heap r       postgres    false            �           0    0    TABLE proyectos    ACL     /   GRANT ALL ON TABLE public.proyectos TO oliver;
          public               postgres    false    220            �            1259    16417    proyectos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.proyectos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.proyectos_id_seq;
       public               postgres    false    220            �           0    0    proyectos_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.proyectos_id_seq OWNED BY public.proyectos.id;
          public               postgres    false    219            �            1259    16513    tecnologias    TABLE     i   CREATE TABLE public.tecnologias (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);
    DROP TABLE public.tecnologias;
       public         heap r       postgres    false            �           0    0    TABLE tecnologias    ACL     1   GRANT ALL ON TABLE public.tecnologias TO oliver;
          public               postgres    false    226            �            1259    16512    tecnologias_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tecnologias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.tecnologias_id_seq;
       public               postgres    false    226            �           0    0    tecnologias_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.tecnologias_id_seq OWNED BY public.tecnologias.id;
          public               postgres    false    225            �            1259    16614    vista_proyectos_con_autor    VIEW     =  CREATE VIEW public.vista_proyectos_con_autor AS
 SELECT p.id AS proyecto_id,
    p.id_usuario,
    p.titulo,
    p.descripcion,
    p.url,
    p.fecha_creacion,
    p.repositorio_github,
    p.publico,
    l.username AS autor_username
   FROM (public.proyectos p
     JOIN public.login l ON ((l.id = p.id_usuario)));
 ,   DROP VIEW public.vista_proyectos_con_autor;
       public       v       postgres    false    218    220    220    220    220    220    220    220    220    218            �           0    0    TABLE vista_proyectos_con_autor    ACL     ?   GRANT ALL ON TABLE public.vista_proyectos_con_autor TO oliver;
          public               postgres    false    233            �            1259    16587    vista_proyectos_publicos    VIEW     [  CREATE VIEW public.vista_proyectos_publicos AS
 SELECT p.id AS proyecto_id,
    p.titulo,
    p.descripcion,
    p.url,
    p.fecha_creacion,
    p.repositorio_github,
    p.publico,
    l.id AS autor_id,
    l.username AS autor_username,
    COALESCE(( SELECT json_agg(c.nombre ORDER BY c.nombre) AS json_agg
           FROM (public.proyecto_categorias pc
             JOIN public.categorias c ON ((c.id = pc.id_categoria)))
          WHERE (pc.id_proyecto = p.id)), '[]'::json) AS categorias,
    COALESCE(( SELECT json_agg(e.nombre ORDER BY e.nombre) AS json_agg
           FROM (public.proyecto_etiquetas pe
             JOIN public.etiquetas e ON ((e.id = pe.id_etiqueta)))
          WHERE (pe.id_proyecto = p.id)), '[]'::json) AS etiquetas,
    COALESCE(( SELECT json_agg(t.nombre ORDER BY t.nombre) AS json_agg
           FROM (public.proyecto_tecnologias pt
             JOIN public.tecnologias t ON ((t.id = pt.id_tecnologia)))
          WHERE (pt.id_proyecto = p.id)), '[]'::json) AS tecnologias
   FROM (public.proyectos p
     JOIN public.login l ON ((l.id = p.id_usuario)))
  WHERE (p.publico = true);
 +   DROP VIEW public.vista_proyectos_publicos;
       public       v       postgres    false    218    229    229    228    228    227    227    226    226    224    224    222    222    220    220    220    220    220    220    220    220    218            �           0    0    TABLE vista_proyectos_publicos    ACL     >   GRANT ALL ON TABLE public.vista_proyectos_publicos TO oliver;
          public               postgres    false    230            �           2604    16622    calificaciones id    DEFAULT     v   ALTER TABLE ONLY public.calificaciones ALTER COLUMN id SET DEFAULT nextval('public.calificaciones_id_seq'::regclass);
 @   ALTER TABLE public.calificaciones ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    234    235    235            �           2604    16498    categorias id    DEFAULT     n   ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);
 <   ALTER TABLE public.categorias ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    222    222            �           2604    16596    comentarios id    DEFAULT     p   ALTER TABLE ONLY public.comentarios ALTER COLUMN id SET DEFAULT nextval('public.comentarios_id_seq'::regclass);
 =   ALTER TABLE public.comentarios ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    232    231    232            �           2604    16507    etiquetas id    DEFAULT     l   ALTER TABLE ONLY public.etiquetas ALTER COLUMN id SET DEFAULT nextval('public.etiquetas_id_seq'::regclass);
 ;   ALTER TABLE public.etiquetas ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    224    223    224            �           2604    16410    login id    DEFAULT     d   ALTER TABLE ONLY public.login ALTER COLUMN id SET DEFAULT nextval('public.login_id_seq'::regclass);
 7   ALTER TABLE public.login ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    217    218            �           2604    16421    proyectos id    DEFAULT     l   ALTER TABLE ONLY public.proyectos ALTER COLUMN id SET DEFAULT nextval('public.proyectos_id_seq'::regclass);
 ;   ALTER TABLE public.proyectos ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    220    220            �           2604    16516    tecnologias id    DEFAULT     p   ALTER TABLE ONLY public.tecnologias ALTER COLUMN id SET DEFAULT nextval('public.tecnologias_id_seq'::regclass);
 =   ALTER TABLE public.tecnologias ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    226    225    226            �          0    16619    calificaciones 
   TABLE DATA           S   COPY public.calificaciones (id, id_usuario, id_proyecto, valor, fecha) FROM stdin;
    public               postgres    false    235   Pu       �          0    16495 
   categorias 
   TABLE DATA           0   COPY public.categorias (id, nombre) FROM stdin;
    public               postgres    false    222   �u       �          0    16593    comentarios 
   TABLE DATA           T   COPY public.comentarios (id, id_proyecto, id_usuario, contenido, fecha) FROM stdin;
    public               postgres    false    232   Bv       �          0    16504 	   etiquetas 
   TABLE DATA           /   COPY public.etiquetas (id, nombre) FROM stdin;
    public               postgres    false    224   �v       �          0    16407    login 
   TABLE DATA           r   COPY public.login (id, username, password, email, verificado, token_verificacion, token_recuperacion) FROM stdin;
    public               postgres    false    218   :w       �          0    16521    proyecto_categorias 
   TABLE DATA           H   COPY public.proyecto_categorias (id_proyecto, id_categoria) FROM stdin;
    public               postgres    false    227   �w       �          0    16536    proyecto_etiquetas 
   TABLE DATA           F   COPY public.proyecto_etiquetas (id_proyecto, id_etiqueta) FROM stdin;
    public               postgres    false    228   x       �          0    16551    proyecto_tecnologias 
   TABLE DATA           J   COPY public.proyecto_tecnologias (id_proyecto, id_tecnologia) FROM stdin;
    public               postgres    false    229   Bx       �          0    16418 	   proyectos 
   TABLE DATA           z   COPY public.proyectos (id, id_usuario, titulo, descripcion, url, fecha_creacion, repositorio_github, publico) FROM stdin;
    public               postgres    false    220   ex       �          0    16513    tecnologias 
   TABLE DATA           1   COPY public.tecnologias (id, nombre) FROM stdin;
    public               postgres    false    226   �x       �           0    0    calificaciones_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.calificaciones_id_seq', 14, true);
          public               postgres    false    234            �           0    0    categorias_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.categorias_id_seq', 45, true);
          public               postgres    false    221            �           0    0    comentarios_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.comentarios_id_seq', 13, true);
          public               postgres    false    231            �           0    0    etiquetas_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.etiquetas_id_seq', 41, true);
          public               postgres    false    223            �           0    0    login_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.login_id_seq', 16, true);
          public               postgres    false    217            �           0    0    proyectos_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.proyectos_id_seq', 57, true);
          public               postgres    false    219            �           0    0    tecnologias_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.tecnologias_id_seq', 40, true);
          public               postgres    false    225            �           2606    16628 8   calificaciones calificaciones_id_usuario_id_proyecto_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.calificaciones
    ADD CONSTRAINT calificaciones_id_usuario_id_proyecto_key UNIQUE (id_usuario, id_proyecto);
 b   ALTER TABLE ONLY public.calificaciones DROP CONSTRAINT calificaciones_id_usuario_id_proyecto_key;
       public                 postgres    false    235    235            �           2606    16626 "   calificaciones calificaciones_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.calificaciones
    ADD CONSTRAINT calificaciones_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.calificaciones DROP CONSTRAINT calificaciones_pkey;
       public                 postgres    false    235            �           2606    16502     categorias categorias_nombre_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_nombre_key UNIQUE (nombre);
 J   ALTER TABLE ONLY public.categorias DROP CONSTRAINT categorias_nombre_key;
       public                 postgres    false    222            �           2606    16500    categorias categorias_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categorias DROP CONSTRAINT categorias_pkey;
       public                 postgres    false    222            �           2606    16602    comentarios comentarios_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.comentarios DROP CONSTRAINT comentarios_pkey;
       public                 postgres    false    232            �           2606    16511    etiquetas etiquetas_nombre_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.etiquetas
    ADD CONSTRAINT etiquetas_nombre_key UNIQUE (nombre);
 H   ALTER TABLE ONLY public.etiquetas DROP CONSTRAINT etiquetas_nombre_key;
       public                 postgres    false    224            �           2606    16509    etiquetas etiquetas_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.etiquetas
    ADD CONSTRAINT etiquetas_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.etiquetas DROP CONSTRAINT etiquetas_pkey;
       public                 postgres    false    224            �           2606    16412    login login_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.login DROP CONSTRAINT login_pkey;
       public                 postgres    false    218            �           2606    16525 ,   proyecto_categorias proyecto_categorias_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.proyecto_categorias
    ADD CONSTRAINT proyecto_categorias_pkey PRIMARY KEY (id_proyecto, id_categoria);
 V   ALTER TABLE ONLY public.proyecto_categorias DROP CONSTRAINT proyecto_categorias_pkey;
       public                 postgres    false    227    227            �           2606    16540 *   proyecto_etiquetas proyecto_etiquetas_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.proyecto_etiquetas
    ADD CONSTRAINT proyecto_etiquetas_pkey PRIMARY KEY (id_proyecto, id_etiqueta);
 T   ALTER TABLE ONLY public.proyecto_etiquetas DROP CONSTRAINT proyecto_etiquetas_pkey;
       public                 postgres    false    228    228            �           2606    16555 .   proyecto_tecnologias proyecto_tecnologias_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.proyecto_tecnologias
    ADD CONSTRAINT proyecto_tecnologias_pkey PRIMARY KEY (id_proyecto, id_tecnologia);
 X   ALTER TABLE ONLY public.proyecto_tecnologias DROP CONSTRAINT proyecto_tecnologias_pkey;
       public                 postgres    false    229    229            �           2606    16425    proyectos proyectos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.proyectos DROP CONSTRAINT proyectos_pkey;
       public                 postgres    false    220            �           2606    16520 "   tecnologias tecnologias_nombre_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.tecnologias
    ADD CONSTRAINT tecnologias_nombre_key UNIQUE (nombre);
 L   ALTER TABLE ONLY public.tecnologias DROP CONSTRAINT tecnologias_nombre_key;
       public                 postgres    false    226            �           2606    16518    tecnologias tecnologias_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.tecnologias
    ADD CONSTRAINT tecnologias_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.tecnologias DROP CONSTRAINT tecnologias_pkey;
       public                 postgres    false    226            �           2606    16414    login unique_email 
   CONSTRAINT     N   ALTER TABLE ONLY public.login
    ADD CONSTRAINT unique_email UNIQUE (email);
 <   ALTER TABLE ONLY public.login DROP CONSTRAINT unique_email;
       public                 postgres    false    218            �           1259    16613    idx_comentarios_proyecto    INDEX     W   CREATE INDEX idx_comentarios_proyecto ON public.comentarios USING btree (id_proyecto);
 ,   DROP INDEX public.idx_comentarios_proyecto;
       public                 postgres    false    232            �           2606    16634 .   calificaciones calificaciones_id_proyecto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.calificaciones
    ADD CONSTRAINT calificaciones_id_proyecto_fkey FOREIGN KEY (id_proyecto) REFERENCES public.proyectos(id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.calificaciones DROP CONSTRAINT calificaciones_id_proyecto_fkey;
       public               postgres    false    4812    235    220            �           2606    16629 -   calificaciones calificaciones_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.calificaciones
    ADD CONSTRAINT calificaciones_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.login(id) ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.calificaciones DROP CONSTRAINT calificaciones_id_usuario_fkey;
       public               postgres    false    4808    235    218            �           2606    16603 (   comentarios comentarios_id_proyecto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_id_proyecto_fkey FOREIGN KEY (id_proyecto) REFERENCES public.proyectos(id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.comentarios DROP CONSTRAINT comentarios_id_proyecto_fkey;
       public               postgres    false    4812    232    220            �           2606    16608 '   comentarios comentarios_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.login(id) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.comentarios DROP CONSTRAINT comentarios_id_usuario_fkey;
       public               postgres    false    218    232    4808            �           2606    16426    proyectos fk_usuario    FK CONSTRAINT     �   ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES public.login(id) ON DELETE CASCADE;
 >   ALTER TABLE ONLY public.proyectos DROP CONSTRAINT fk_usuario;
       public               postgres    false    220    4808    218            �           2606    16531 9   proyecto_categorias proyecto_categorias_id_categoria_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.proyecto_categorias
    ADD CONSTRAINT proyecto_categorias_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categorias(id) ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.proyecto_categorias DROP CONSTRAINT proyecto_categorias_id_categoria_fkey;
       public               postgres    false    227    4816    222            �           2606    16526 8   proyecto_categorias proyecto_categorias_id_proyecto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.proyecto_categorias
    ADD CONSTRAINT proyecto_categorias_id_proyecto_fkey FOREIGN KEY (id_proyecto) REFERENCES public.proyectos(id) ON DELETE CASCADE;
 b   ALTER TABLE ONLY public.proyecto_categorias DROP CONSTRAINT proyecto_categorias_id_proyecto_fkey;
       public               postgres    false    220    227    4812            �           2606    16546 6   proyecto_etiquetas proyecto_etiquetas_id_etiqueta_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.proyecto_etiquetas
    ADD CONSTRAINT proyecto_etiquetas_id_etiqueta_fkey FOREIGN KEY (id_etiqueta) REFERENCES public.etiquetas(id) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.proyecto_etiquetas DROP CONSTRAINT proyecto_etiquetas_id_etiqueta_fkey;
       public               postgres    false    228    224    4820            �           2606    16541 6   proyecto_etiquetas proyecto_etiquetas_id_proyecto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.proyecto_etiquetas
    ADD CONSTRAINT proyecto_etiquetas_id_proyecto_fkey FOREIGN KEY (id_proyecto) REFERENCES public.proyectos(id) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.proyecto_etiquetas DROP CONSTRAINT proyecto_etiquetas_id_proyecto_fkey;
       public               postgres    false    220    228    4812            �           2606    16556 :   proyecto_tecnologias proyecto_tecnologias_id_proyecto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.proyecto_tecnologias
    ADD CONSTRAINT proyecto_tecnologias_id_proyecto_fkey FOREIGN KEY (id_proyecto) REFERENCES public.proyectos(id) ON DELETE CASCADE;
 d   ALTER TABLE ONLY public.proyecto_tecnologias DROP CONSTRAINT proyecto_tecnologias_id_proyecto_fkey;
       public               postgres    false    229    4812    220            �           2606    16561 <   proyecto_tecnologias proyecto_tecnologias_id_tecnologia_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.proyecto_tecnologias
    ADD CONSTRAINT proyecto_tecnologias_id_tecnologia_fkey FOREIGN KEY (id_tecnologia) REFERENCES public.tecnologias(id) ON DELETE CASCADE;
 f   ALTER TABLE ONLY public.proyecto_tecnologias DROP CONSTRAINT proyecto_tecnologias_id_tecnologia_fkey;
       public               postgres    false    226    229    4824            �           2606    16446 #   proyectos proyectos_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.login(id) ON DELETE CASCADE;
 M   ALTER TABLE ONLY public.proyectos DROP CONSTRAINT proyectos_id_usuario_fkey;
       public               postgres    false    218    4808    220            .           826    16416    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     J   ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO oliver;
                        postgres    false            �   2   x�34�44�45�4�4202�50�54U04�21�20�3�472����� ��(      �   �   x��A
�0D�3��b�Pqk]�E�n>5�Bm4���ެރ7#�COŶ>��z�;��3�oh��7��*\B�s��)X;ѹ"���<l������j�e�"��C*�
�6Nwkb*�5�{x�~�n�Dup�Z������b�Q=�o~,��9�? c/�      �   ;   x�34�45�44���K.J�L�I�4202�50�54U04�21�2��365�04����� 13
�      �   �   x�%���@�s��/0�޻��+�������
���_/�f����_����8T�Ѕ!|(n������'������=��<���yP�+ŹH��c�tC�C5�qKu��5T,7�4)&�kM���-4�E�����:���UJ�0�yY���B-�      �   �   x�U�M�0 ��s�;v�V����aE�KW��UՉ�z���=?/� �~;�1�۫<;"���6�q��r�Ƥ�L�,����zj�,l�Ѩv�+B0�/+(�wpH�y8 �*>�#� ���m���l�q�X�E�hs����cAγt��>@#oҨ���J���� =�{�==&      �      x�35�41����� 
��      �      x�35�41����� 
��      �      x�35�41������ 
��      �   m   x�35�44�t.*MqJ,�L�JML.q�((J-.��,.��+�QRRPl����Y�Q������Y�
T���O��������������������������)�f�p��qqq o�H)      �   �   x��A�0D�3������W��Mck� E�&zz��7�)(
b��A��K�:�O�j���ߖ��,a�[�RXASX�L�qw��������*1Zg��<����K�\��E�`4u��f-�"Hv����6Ζbp���g���������C���_�*�oGS���W���ߛ5]     