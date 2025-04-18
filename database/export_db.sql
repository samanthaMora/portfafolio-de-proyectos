PGDMP                      }            proyect_jwt    17.4    17.4     2           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            3           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            4           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            5           1262    16405    proyect_jwt    DATABASE     q   CREATE DATABASE proyect_jwt WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'es-ES';
    DROP DATABASE proyect_jwt;
                     postgres    false            �            1259    16407    login    TABLE     �   CREATE TABLE public.login (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    email character varying(100) NOT NULL
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
       public               postgres    false    218            6           0    0    login_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.login_id_seq OWNED BY public.login.id;
          public               postgres    false    217            �            1259    16418 	   proyectos    TABLE     �   CREATE TABLE public.proyectos (
    id integer NOT NULL,
    id_usuario integer NOT NULL,
    titulo character varying(100) NOT NULL,
    descripcion text
);
    DROP TABLE public.proyectos;
       public         heap r       postgres    false            7           0    0    TABLE proyectos    ACL     /   GRANT ALL ON TABLE public.proyectos TO oliver;
          public               postgres    false    220            �            1259    16417    proyectos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.proyectos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.proyectos_id_seq;
       public               postgres    false    220            8           0    0    proyectos_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.proyectos_id_seq OWNED BY public.proyectos.id;
          public               postgres    false    219            �            1259    16451    vista_proyectos_con_autor    VIEW     �   CREATE VIEW public.vista_proyectos_con_autor AS
 SELECT proyectos.id,
    proyectos.titulo,
    proyectos.descripcion,
    login.username,
    login.email
   FROM (public.proyectos
     JOIN public.login ON ((proyectos.id_usuario = login.id)));
 ,   DROP VIEW public.vista_proyectos_con_autor;
       public       v       postgres    false    220    220    220    220    218    218    218            9           0    0    TABLE vista_proyectos_con_autor    ACL     ?   GRANT ALL ON TABLE public.vista_proyectos_con_autor TO oliver;
          public               postgres    false    221            �           2604    16410    login id    DEFAULT     d   ALTER TABLE ONLY public.login ALTER COLUMN id SET DEFAULT nextval('public.login_id_seq'::regclass);
 7   ALTER TABLE public.login ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            �           2604    16421    proyectos id    DEFAULT     l   ALTER TABLE ONLY public.proyectos ALTER COLUMN id SET DEFAULT nextval('public.proyectos_id_seq'::regclass);
 ;   ALTER TABLE public.proyectos ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    220    220            -          0    16407    login 
   TABLE DATA           >   COPY public.login (id, username, password, email) FROM stdin;
    public               postgres    false    218          /          0    16418 	   proyectos 
   TABLE DATA           H   COPY public.proyectos (id, id_usuario, titulo, descripcion) FROM stdin;
    public               postgres    false    220   �       :           0    0    login_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.login_id_seq', 23, true);
          public               postgres    false    217            ;           0    0    proyectos_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.proyectos_id_seq', 49, true);
          public               postgres    false    219            �           2606    16412    login login_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.login DROP CONSTRAINT login_pkey;
       public                 postgres    false    218            �           2606    16425    proyectos proyectos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.proyectos DROP CONSTRAINT proyectos_pkey;
       public                 postgres    false    220            �           2606    16414    login unique_email 
   CONSTRAINT     N   ALTER TABLE ONLY public.login
    ADD CONSTRAINT unique_email UNIQUE (email);
 <   ALTER TABLE ONLY public.login DROP CONSTRAINT unique_email;
       public                 postgres    false    218            �           2606    16426    proyectos fk_usuario    FK CONSTRAINT     �   ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES public.login(id) ON DELETE CASCADE;
 >   ALTER TABLE ONLY public.proyectos DROP CONSTRAINT fk_usuario;
       public               postgres    false    4755    218    220            �           2606    16446 #   proyectos proyectos_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.login(id) ON DELETE CASCADE;
 M   ALTER TABLE ONLY public.proyectos DROP CONSTRAINT proyectos_id_usuario_fkey;
       public               postgres    false    220    218    4755                       826    16416    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     J   ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO oliver;
                        postgres    false            -   y  x�=�ɒ�J�q�5NMzg(bC�(]�Ib!=�f��׿{�'Ξ�5�H C[�/>�B��u�*��uN�q^��R�7�6m�ms���m:��m���_@���3L?��+1��i���F.��ǒ]�i|l��W�MWb�dGsw<i��~�C�}��QY+fQ����OR�Yݷ��9��)Cz����M�����;g�������hA�b��7��e����-��|7�\��q�(�6��R�^����!)��3��q*�#U��-JJ�]'���[|l����͛1gj#<���7f���ksH��$^�~&]�=-���0Me5wP0u�W0U���FyW�q�﫿 �@�(�'��m�4嫵����p���D.�J�ŗ2�h�~[���}y�G j"�����;�l$��3fZ/�Ჽ���Q2��A�Y�D��ۼ�u�P�E�؈G��p����q<E�W��`
)_ő"��Nd ˤa}8xj�;:������u�)r��u�s5�5\c�;���y ��gM<s��/���DN��X���6yK��˯W��<?��{>k}YY�9^ �GA�l�\���<sc3"�����d�f��kk��34�����3��&q�A���O�<      /   �   x�]�QN�0���S����n�/&5[��Diǀ�cZx!�>�w�?��� P2>��"� ��T��F��e,��� �3K܁Q �`U�(�gb��G�� �=��A��[=F����k�1c<wP��l�l|��L���
�f�x�;�����u�Zm��M)�8嬉����8@�4�F��zӷm����:a� 3��l9�r�g�u=?!�7��X�     