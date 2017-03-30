CREATE DATABASE databaseName;
CREATE EXTENSION postgis;
CREATE SCHEMA osm;

CREATE TABLE risk(
  id serial,
  name character varying(25) NOT NULL,
  CONSTRAINT risk_pk PRIMARY KEY(id),
  CONSTRAINT risk_unique UNIQUE(name)
);

CREATE TABLE warning_zone(
  id serial,
  geom geometry(Polygon,4326) NOT NULL,
  risk_type integer NOT NULL,
  risk_intensity integer NOT NULL,
  description character varying(255) NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  validation_date date DEFAULT NULL,
  expiration_date date DEFAULT NULL,
  CONSTRAINT warning_zone_pk PRIMARY KEY (id),
  CONSTRAINT warning_zone_fk FOREIGN KEY (risk_type) REFERENCES risk(id)
);

CREATE TABLE anomaly(
  id serial,
  name character varying(25) NOT NULL,
  CONSTRAINT anomaly_pk PRIMARY KEY(id),
  CONSTRAINT anomaly_unique UNIQUE(name)
);

CREATE TABLE anomaly_zone(
  id serial,
  geom geometry(Polygon,4326) NOT NULL,
  anomaly_type integer NOT NULL,
  description character varying(255) NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  expiration_date date DEFAULT NULL,
  CONSTRAINT anomaly_zone_pk PRIMARY KEY (id),
  CONSTRAINT anomaly_zone_fk FOREIGN KEY (anomaly_type) REFERENCES anomaly(id)
);

 CREATE TABLE business_poi(
  id serial NOT NULL
  geom geometry(Point, 4326) NOT NULL,
  name_poi text NOT NULL, 
  type_poi integer DEFAULT NULL,
  layer_poi VARCHAR(50) DEFAULT NULL);
 
 CREATE TABLE type_poi_association(
  key serial PRIMARY KEY,
  type text NOT NULL); 
   


GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.warning_zone TO api;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.anomaly_zone TO api;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.risk TO api;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.anomaly TO api;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.business_poi TO api;

GRANT USAGE ON SEQUENCE public.business_poi_id_seq TO api;
GRANT USAGE ON SEQUENCE public.anomaly_id_seq TO api;
GRANT USAGE ON SEQUENCE public.anomaly_zone_id_seq TO api;
GRANT USAGE ON SEQUENCE public.risk_id_seq TO api;
GRANT USAGE ON SEQUENCE public.warning_zone_id_seq TO api;

