-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."DirecaoCorte" AS ENUM('OPERACIONAL', 'ADMINISTRATIVO');--> statement-breakpoint
CREATE TYPE "public"."Empresa" AS ENUM('ITB', 'LDB', 'DPA');--> statement-breakpoint
CREATE TYPE "public"."ExibirClienteCabecalhoEnum" AS ENUM('PRIMEIRO', 'TODOS', 'NENHUM');--> statement-breakpoint
CREATE TYPE "public"."MotivoCorteMercadoria" AS ENUM('FALTA_MERCADORIA', 'FALTA_ESPACO', 'RECUSA_SEFAZ');--> statement-breakpoint
CREATE TYPE "public"."Role" AS ENUM('FUNCIONARIO', 'USER', 'ADMIN', 'MASTER');--> statement-breakpoint
CREATE TYPE "public"."SegmentoProduto" AS ENUM('SECO', 'REFR');--> statement-breakpoint
CREATE TYPE "public"."StatusDemanda" AS ENUM('EM_PROGRESSO', 'FINALIZADA', 'PAUSA', 'CANCELADA');--> statement-breakpoint
CREATE TYPE "public"."StatusDevolucao" AS ENUM('AGUARDANDO_LIBERACAO', 'AGUARDANDO_CONFERENCIA', 'EM_CONFERENCIA', 'CONFERENCIA_FINALIZADA', 'FINALIZADO', 'CANCELADO');--> statement-breakpoint
CREATE TYPE "public"."StatusPalete" AS ENUM('NAO_INICIADO', 'EM_PROGRESSO', 'CONCLUIDO', 'EM_PAUSA');--> statement-breakpoint
CREATE TYPE "public"."StatusTransporte" AS ENUM('AGUARDANDO_SEPARACAO', 'EM_SEPARACAO', 'SEPARACAO_CONCLUIDA', 'EM_CONFERENCIA', 'CONFERENCIA_CONCLUIDA', 'EM_CARREGAMENTO', 'CARREGAMENTO_CONCLUIDO', 'FATURADO', 'LIBERADO_PORTARIA', 'CANCELADO');--> statement-breakpoint
CREATE TYPE "public"."TipoDevolucaoAnomalias" AS ENUM('AVARIA', 'FALTA', 'SOBRA');--> statement-breakpoint
CREATE TYPE "public"."TipoDevolucaoItens" AS ENUM('CONTABIL', 'FISICO');--> statement-breakpoint
CREATE TYPE "public"."TipoDevolucaoNotas" AS ENUM('DEVOLUCAO', 'DEVOLUCAO_PARCIAL', 'REENTREGA');--> statement-breakpoint
CREATE TYPE "public"."TipoEvento" AS ENUM('CRIACAO_TRANSPORTE', 'INICIO_SEPARACAO', 'TERMINO_SEPARACAO', 'INICIO_CONFERENCIA', 'TERMINO_CONFERENCIA', 'INICIO_CARREGAMENTO', 'TERMINO_CARREGAMENTO', 'CORTE_PRODUTO', 'FATURADO', 'LIBERADO_PORTARIA');--> statement-breakpoint
CREATE TYPE "public"."TipoImpressao" AS ENUM('TRANSPORTE', 'CLIENTE');--> statement-breakpoint
CREATE TYPE "public"."TipoPeso" AS ENUM('PVAR', 'PPAR');--> statement-breakpoint
CREATE TYPE "public"."TipoProcesso" AS ENUM('SEPARACAO', 'CARREGAMENTO', 'CONFERENCIA');--> statement-breakpoint
CREATE TYPE "public"."TipoQuebraPalete" AS ENUM('LINHAS', 'PERCENTUAL');--> statement-breakpoint
CREATE TYPE "public"."Turno" AS ENUM('MANHA', 'TARDE', 'NOITE', 'INTERMEDIARIO', 'ADMINISTRATIVO');--> statement-breakpoint
CREATE TABLE "Demanda" (
	"id" serial PRIMARY KEY NOT NULL,
	"processo" "TipoProcesso" NOT NULL,
	"inicio" timestamp(3) NOT NULL,
	"fim" timestamp(3),
	"status" "StatusDemanda" DEFAULT 'EM_PROGRESSO' NOT NULL,
	"cadastradoPorId" text NOT NULL,
	"turno" "Turno" NOT NULL,
	"funcionarioId" text NOT NULL,
	"criadoEm" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"centerId" text NOT NULL,
	"obs" text,
	"dataExpedicao" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Configuracao" (
	"id" serial PRIMARY KEY NOT NULL,
	"chave" text NOT NULL,
	"valor" text NOT NULL,
	"descricao" text,
	"centerId" text
);
--> statement-breakpoint
CREATE TABLE "CorteMercadoria" (
	"id" serial PRIMARY KEY NOT NULL,
	"produto" text NOT NULL,
	"lote" text NOT NULL,
	"unidades" integer NOT NULL,
	"motivo" "MotivoCorteMercadoria" NOT NULL,
	"realizado" boolean DEFAULT false NOT NULL,
	"criadoEm" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"atualizadoEm" timestamp(3) NOT NULL,
	"criadoPorId" text DEFAULT '421931' NOT NULL,
	"transporteId" text NOT NULL,
	"direcao" "DirecaoCorte",
	"caixas" integer NOT NULL,
	"centerId" text NOT NULL,
	"descricao" text,
	"realizadoPorId" text
);
--> statement-breakpoint
CREATE TABLE "Center" (
	"centerId" text PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"state" text NOT NULL,
	"cluster" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "DashboardProdutividadeCenter" (
	"id" serial PRIMARY KEY NOT NULL,
	"dataRegistro" timestamp(3) NOT NULL,
	"centerId" text NOT NULL,
	"cluster" text DEFAULT 'distribuicao' NOT NULL,
	"empresa" text DEFAULT 'LACTALIS' NOT NULL,
	"totalCaixas" integer NOT NULL,
	"totalUnidades" integer NOT NULL,
	"totalPaletes" integer NOT NULL,
	"totalEnderecos" integer NOT NULL,
	"totalPausasQuantidade" integer NOT NULL,
	"totalPausasTempo" integer NOT NULL,
	"totalTempoTrabalhado" integer NOT NULL,
	"totalDemandas" integer NOT NULL,
	"processo" "TipoProcesso" NOT NULL,
	"turno" "Turno" NOT NULL,
	"criadoEm" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"atualizadoEm" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "DashboardProdutividadeUser" (
	"id" serial PRIMARY KEY NOT NULL,
	"dataRegistro" timestamp(3) NOT NULL,
	"centerId" text NOT NULL,
	"funcionarioId" text NOT NULL,
	"totalCaixas" integer NOT NULL,
	"totalUnidades" integer NOT NULL,
	"totalPaletes" integer NOT NULL,
	"totalEnderecos" integer NOT NULL,
	"totalPausasQuantidade" integer NOT NULL,
	"totalPausasTempo" integer NOT NULL,
	"totalTempoTrabalhado" integer NOT NULL,
	"totalDemandas" integer NOT NULL,
	"processo" "TipoProcesso" NOT NULL,
	"turno" "Turno" NOT NULL,
	"criadoEm" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"atualizadoEm" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "DevolucaImagens" (
	"id" serial PRIMARY KEY NOT NULL,
	"demandaId" integer NOT NULL,
	"processo" text NOT NULL,
	"tag" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ConfiguracaoImpressaoMapa" (
	"id" text PRIMARY KEY NOT NULL,
	"tipoImpressao" "TipoImpressao" NOT NULL,
	"quebraPalete" boolean DEFAULT false NOT NULL,
	"tipoQuebra" "TipoQuebraPalete",
	"valorQuebra" numeric(65, 30),
	"separarPaleteFull" boolean DEFAULT false NOT NULL,
	"separarUnidades" boolean DEFAULT false NOT NULL,
	"exibirInfoCabecalho" "ExibirClienteCabecalhoEnum" DEFAULT 'NENHUM',
	"segregarFifo" text[],
	"dataMaximaPercentual" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"centerId" text NOT NULL,
	"atribuidoPorId" text,
	"empresa" text DEFAULT 'LDB' NOT NULL,
	"tipoImpressaoConferencia" "TipoImpressao" DEFAULT 'TRANSPORTE' NOT NULL,
	"ordemConferencia" text[] DEFAULT '{"RAY"}',
	"ordemFifo" text[] DEFAULT '{"RAY"}',
	"ordemPaletes" text[] DEFAULT '{"RAY"}',
	"ordemPicking" text[] DEFAULT '{"RAY"}',
	"ordemUnidades" text[] DEFAULT '{"RAY"}'
);
--> statement-breakpoint
CREATE TABLE "HistoricoImpressaoMapa" (
	"id" serial PRIMARY KEY NOT NULL,
	"impressoEm" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"transporteId" text NOT NULL,
	"impressoPorId" text NOT NULL,
	"tipoImpressao" "TipoProcesso" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Palete" (
	"id" text PRIMARY KEY NOT NULL,
	"empresa" text NOT NULL,
	"quantidadeCaixas" integer NOT NULL,
	"quantidadeUnidades" integer NOT NULL,
	"quantidadePaletes" integer NOT NULL,
	"enderecoVisitado" integer NOT NULL,
	"segmento" text NOT NULL,
	"transporteId" text NOT NULL,
	"tipoProcesso" "TipoProcesso" DEFAULT 'SEPARACAO' NOT NULL,
	"criadoEm" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"atualizadoEm" timestamp(3) NOT NULL,
	"demandaId" integer,
	"status" "StatusPalete" DEFAULT 'NAO_INICIADO' NOT NULL,
	"validado" boolean DEFAULT false NOT NULL,
	"criadoPorId" text NOT NULL,
	"fim" timestamp(3),
	"inicio" timestamp(3),
	"totalCaixas" integer DEFAULT 0 NOT NULL,
	"pesoLiquido" double precision DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "PausaGeral" (
	"id" serial PRIMARY KEY NOT NULL,
	"inicio" timestamp(3) NOT NULL,
	"fim" timestamp(3),
	"motivo" text NOT NULL,
	"centerId" text NOT NULL,
	"processo" "TipoProcesso" NOT NULL,
	"turno" "Turno" NOT NULL,
	"registradoPorId" text NOT NULL,
	"criadoEm" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"atualizadoEm" timestamp(3) NOT NULL,
	"segmento" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Pausa" (
	"id" serial PRIMARY KEY NOT NULL,
	"inicio" timestamp(3) NOT NULL,
	"fim" timestamp(3),
	"motivo" text NOT NULL,
	"descricao" text,
	"demandaId" integer NOT NULL,
	"registradoPorId" text NOT NULL,
	"pausaGeralId" integer
);
--> statement-breakpoint
CREATE TABLE "HistoricoStatusTransporte" (
	"id" serial PRIMARY KEY NOT NULL,
	"alteradoEm" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"tipoEvento" "TipoEvento" NOT NULL,
	"descricao" text NOT NULL,
	"transporteId" text NOT NULL,
	"alteradoPorId" text,
	"processo" "TipoProcesso" DEFAULT 'SEPARACAO' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Transporte" (
	"id" serial PRIMARY KEY NOT NULL,
	"numeroTransporte" text NOT NULL,
	"status" "StatusTransporte" DEFAULT 'AGUARDANDO_SEPARACAO' NOT NULL,
	"nomeRota" text NOT NULL,
	"nomeTransportadora" text NOT NULL,
	"placa" text NOT NULL,
	"criadoEm" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"atualizadoEm" timestamp(3) NOT NULL,
	"cadastradoPorId" text NOT NULL,
	"dataExpedicao" timestamp(6) NOT NULL,
	"centerId" text NOT NULL,
	"obs" text,
	"prioridade" integer DEFAULT 0 NOT NULL,
	"carregamento" "StatusPalete" DEFAULT 'NAO_INICIADO' NOT NULL,
	"conferencia" "StatusPalete" DEFAULT 'NAO_INICIADO' NOT NULL,
	"separacao" "StatusPalete" DEFAULT 'NAO_INICIADO' NOT NULL,
	"cargaParada" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "devolucao_check_list" (
	"id" serial PRIMARY KEY NOT NULL,
	"temperaturaBau" double precision NOT NULL,
	"temperaturaProduto" double precision NOT NULL,
	"demandaId" integer NOT NULL,
	"criadoEm" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"atualizadoEm" timestamp(3) NOT NULL,
	"anomalias" text[]
);
--> statement-breakpoint
CREATE TABLE "devolucao_historico_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"devolucaoDemandaId" integer NOT NULL,
	"status" "StatusDevolucao" NOT NULL,
	"responsavelId" text,
	"criadoEm" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "devolucao_itens" (
	"id" serial PRIMARY KEY NOT NULL,
	"sku" text NOT NULL,
	"descricao" text NOT NULL,
	"lote" text,
	"fabricacao" date,
	"sif" text,
	"quantidadeCaixas" integer,
	"quantidadeUnidades" integer,
	"tipo" "TipoDevolucaoItens" NOT NULL,
	"devolucaoNotasId" text,
	"demandaId" integer NOT NULL,
	"avariaCaixas" integer,
	"avariaUnidades" integer,
	"nota_id" integer
);
--> statement-breakpoint
CREATE TABLE "devolucao_notas" (
	"id" serial PRIMARY KEY NOT NULL,
	"empresa" "Empresa" NOT NULL,
	"devolucaoDemandaId" integer NOT NULL,
	"notaFiscal" text NOT NULL,
	"motivoDevolucao" text NOT NULL,
	"descMotivoDevolucao" text,
	"nfParcial" text,
	"idViagemRavex" text,
	"criadoEm" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"atualizadoEm" timestamp(3) NOT NULL,
	"tipo" "TipoDevolucaoNotas" DEFAULT 'DEVOLUCAO' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"password" text,
	"centerId" text NOT NULL,
	"token" text,
	"turno" "Turno" DEFAULT 'NOITE' NOT NULL,
	"resetSenha" boolean DEFAULT true NOT NULL,
	"empresa" text DEFAULT 'LDB' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "devolucao_demanda" (
	"id" serial PRIMARY KEY NOT NULL,
	"placa" text NOT NULL,
	"motorista" text NOT NULL,
	"idTransportadora" text,
	"telefone" text,
	"cargaSegregada" boolean DEFAULT false NOT NULL,
	"quantidadePaletes" integer DEFAULT 0,
	"doca" text,
	"centerId" text NOT NULL,
	"adicionadoPorId" text NOT NULL,
	"conferenteId" text,
	"criadoEm" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"atualizadoEm" timestamp(3) NOT NULL,
	"status" "StatusDevolucao" DEFAULT 'AGUARDANDO_LIBERACAO' NOT NULL,
	"fechouComAnomalia" boolean,
	"liberadoParaConferenciaEm" timestamp(3),
	"inicioConferenciaEm" timestamp(3),
	"fimConferenciaEm" timestamp(3),
	"finalizadoEm" timestamp(3),
	"senha" text NOT NULL,
	"viagemId" text
);
--> statement-breakpoint
CREATE TABLE "devolucao_anomalias" (
	"id" serial PRIMARY KEY NOT NULL,
	"demandaId" integer NOT NULL,
	"tipo" text NOT NULL,
	"tratado" boolean DEFAULT false NOT NULL,
	"sku" text NOT NULL,
	"descricao" text NOT NULL,
	"lote" text NOT NULL,
	"quantidadeCaixas" integer NOT NULL,
	"quantidadeUnidades" integer NOT NULL,
	"criadoEm" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"atualizadoEm" timestamp(3) NOT NULL,
	"natureza" text,
	"causa" text
);
--> statement-breakpoint
CREATE TABLE "imagem" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"tipo" text,
	"processo_id" text NOT NULL,
	"tipoProcesso" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "produto" (
	"codEan" text,
	"codDum" text,
	"sku" text PRIMARY KEY NOT NULL,
	"descricao" text NOT NULL,
	"shelf" integer NOT NULL,
	"tipoPeso" "TipoPeso" NOT NULL,
	"pesoLiquidoCaixa" numeric(65, 30) NOT NULL,
	"pesoLiquidoUnidade" numeric(65, 30) NOT NULL,
	"unPorCaixa" integer NOT NULL,
	"caixaPorPallet" integer NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"segmento" "SegmentoProduto" NOT NULL,
	"empresa" "Empresa" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rules_engines" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"centerId" text NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	"conditions" jsonb NOT NULL,
	"createdBy" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"processo" text NOT NULL,
	"criadoPorId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "devolucao_transportadoras" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" text NOT NULL,
	"centerId" text NOT NULL,
	"criadoEm" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"atualizadoEm" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "TransporteCargaParada" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name ""TransporteCargaParada_id_seq"" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1),
	"motivo" text,
	"dataExpedicao" date,
	"transportId" text,
	"userId" text,
	"Observacao" text
);
--> statement-breakpoint
CREATE TABLE "playing_with_neon" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"value" real
);
--> statement-breakpoint
CREATE TABLE "produtividade_anomalia" (
	"id" serial PRIMARY KEY NOT NULL,
	"demandaId" integer NOT NULL,
	"centerId" text NOT NULL,
	"funcionarioId" text NOT NULL,
	"criadoPorId" text NOT NULL,
	"inicio" timestamp(3) NOT NULL,
	"fim" timestamp(3),
	"caixas" integer NOT NULL,
	"unidades" integer NOT NULL,
	"paletes" integer NOT NULL,
	"enderecosVisitado" integer NOT NULL,
	"produtividade" double precision NOT NULL,
	"motivoAnomalia" text NOT NULL,
	"motivoAnomaliaDescricao" text,
	"paletesNaDemanda" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "movimentacao" (
	"id_mov" serial PRIMARY KEY NOT NULL,
	"id_usuario" text,
	"id_centro" text NOT NULL,
	"palete" varchar(50) NOT NULL,
	"origem" varchar(50),
	"destino" varchar(50),
	"prioridade" integer NOT NULL,
	"status" varchar(20) DEFAULT 'pendente',
	"data_criacao" timestamp DEFAULT now(),
	"data_execucao" timestamp,
	"sku" text,
	"descricao" text,
	"lote" text,
	"executado_por" text,
	"iniciado" timestamp
);
--> statement-breakpoint
CREATE TABLE "transporte_anomalia" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "transporte_anomalia_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"transporteId" text,
	"anomalia" text,
	"anomaliaPersonalizada" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "uq_transporte_anomalia" UNIQUE("transporteId","anomalia")
);
--> statement-breakpoint
CREATE TABLE "lite_validacao" (
	"id" serial PRIMARY KEY NOT NULL,
	"data_ref" date NOT NULL,
	"endereco" text NOT NULL,
	"sku" text,
	"descricao" text,
	"data_validade" date,
	"lote" text,
	"peso" numeric DEFAULT '0',
	"caixas" integer,
	"qtd_palete" integer,
	"capacidade_palete" integer,
	"area" text,
	"centro_id" text NOT NULL,
	"codigo_bloqueio" text,
	"validado" boolean DEFAULT false,
	"adicionar_por" text,
	"contado_por" text,
	"hora_registro" timestamp
);
--> statement-breakpoint
CREATE TABLE "lite_anomalia" (
	"id" serial PRIMARY KEY NOT NULL,
	"endereco" text,
	"centro_id" text,
	"sku" text,
	"lote" text,
	"quantidade" integer,
	"peso" numeric,
	"data_referencia" date,
	"add_por" text
);
--> statement-breakpoint
CREATE TABLE "UserCenter" (
	"userId" text NOT NULL,
	"centerId" text NOT NULL,
	"assignedAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"processo" text DEFAULT 'EXPEDICAO' NOT NULL,
	"role" "Role" DEFAULT 'FUNCIONARIO' NOT NULL,
	"roles" text[],
	CONSTRAINT "UserCenter_pkey" PRIMARY KEY("userId","centerId","processo")
);
--> statement-breakpoint
ALTER TABLE "Demanda" ADD CONSTRAINT "Demanda_cadastradoPorId_fkey" FOREIGN KEY ("cadastradoPorId") REFERENCES "public"."User"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Demanda" ADD CONSTRAINT "Demanda_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Demanda" ADD CONSTRAINT "Demanda_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "public"."User"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Configuracao" ADD CONSTRAINT "Configuracao_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "CorteMercadoria" ADD CONSTRAINT "CorteMercadoria_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "CorteMercadoria" ADD CONSTRAINT "CorteMercadoria_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "public"."User"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "CorteMercadoria" ADD CONSTRAINT "CorteMercadoria_realizadoPorId_fkey" FOREIGN KEY ("realizadoPorId") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "CorteMercadoria" ADD CONSTRAINT "CorteMercadoria_transporteId_fkey" FOREIGN KEY ("transporteId") REFERENCES "public"."Transporte"("numeroTransporte") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "DashboardProdutividadeCenter" ADD CONSTRAINT "DashboardProdutividadeCenter_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "DashboardProdutividadeUser" ADD CONSTRAINT "DashboardProdutividadeUser_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "DashboardProdutividadeUser" ADD CONSTRAINT "DashboardProdutividadeUser_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "public"."User"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "DevolucaImagens" ADD CONSTRAINT "DevolucaImagens_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ConfiguracaoImpressaoMapa" ADD CONSTRAINT "ConfiguracaoImpressaoMapa_atribuidoPorId_fkey" FOREIGN KEY ("atribuidoPorId") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ConfiguracaoImpressaoMapa" ADD CONSTRAINT "ConfiguracaoImpressaoMapa_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "HistoricoImpressaoMapa" ADD CONSTRAINT "HistoricoImpressaoMapa_impressoPorId_fkey" FOREIGN KEY ("impressoPorId") REFERENCES "public"."User"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "HistoricoImpressaoMapa" ADD CONSTRAINT "HistoricoImpressaoMapa_transporteId_fkey" FOREIGN KEY ("transporteId") REFERENCES "public"."Transporte"("numeroTransporte") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Palete" ADD CONSTRAINT "Palete_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "public"."User"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Palete" ADD CONSTRAINT "Palete_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "public"."Demanda"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Palete" ADD CONSTRAINT "Palete_transporteId_fkey" FOREIGN KEY ("transporteId") REFERENCES "public"."Transporte"("numeroTransporte") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "PausaGeral" ADD CONSTRAINT "PausaGeral_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "PausaGeral" ADD CONSTRAINT "PausaGeral_registradoPorId_fkey" FOREIGN KEY ("registradoPorId") REFERENCES "public"."User"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Pausa" ADD CONSTRAINT "Pausa_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "public"."Demanda"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Pausa" ADD CONSTRAINT "Pausa_pausaGeralId_fkey" FOREIGN KEY ("pausaGeralId") REFERENCES "public"."PausaGeral"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Pausa" ADD CONSTRAINT "Pausa_registradoPorId_fkey" FOREIGN KEY ("registradoPorId") REFERENCES "public"."User"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "HistoricoStatusTransporte" ADD CONSTRAINT "HistoricoStatusTransporte_alteradoPorId_fkey" FOREIGN KEY ("alteradoPorId") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "HistoricoStatusTransporte" ADD CONSTRAINT "HistoricoStatusTransporte_transporteId_fkey" FOREIGN KEY ("transporteId") REFERENCES "public"."Transporte"("numeroTransporte") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Transporte" ADD CONSTRAINT "Transporte_cadastradoPorId_fkey" FOREIGN KEY ("cadastradoPorId") REFERENCES "public"."User"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Transporte" ADD CONSTRAINT "Transporte_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "devolucao_check_list" ADD CONSTRAINT "devolucao_check_list_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "devolucao_historico_status" ADD CONSTRAINT "devolucao_historico_status_devolucaoDemandaId_fkey" FOREIGN KEY ("devolucaoDemandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "devolucao_historico_status" ADD CONSTRAINT "devolucao_historico_status_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "devolucao_itens" ADD CONSTRAINT "id_nota" FOREIGN KEY ("nota_id") REFERENCES "public"."devolucao_notas"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "devolucao_itens" ADD CONSTRAINT "devolucao_itens_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "devolucao_notas" ADD CONSTRAINT "devolucao_notas_devolucaoDemandaId_fkey" FOREIGN KEY ("devolucaoDemandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "User" ADD CONSTRAINT "User_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "devolucao_demanda" ADD CONSTRAINT "devolucao_demanda_adicionadoPorId_fkey" FOREIGN KEY ("adicionadoPorId") REFERENCES "public"."User"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "devolucao_demanda" ADD CONSTRAINT "devolucao_demanda_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "devolucao_demanda" ADD CONSTRAINT "devolucao_demanda_conferenteId_fkey" FOREIGN KEY ("conferenteId") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "devolucao_anomalias" ADD CONSTRAINT "devolucao_anomalias_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "rules_engines" ADD CONSTRAINT "rules_engines_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "rules_engines" ADD CONSTRAINT "rules_engines_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "public"."User"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "devolucao_transportadoras" ADD CONSTRAINT "devolucao_transportadoras_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "TransporteCargaParada" ADD CONSTRAINT "transporte_id" FOREIGN KEY ("transportId") REFERENCES "public"."Transporte"("numeroTransporte") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "TransporteCargaParada" ADD CONSTRAINT "user_id" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "produtividade_anomalia" ADD CONSTRAINT "AnomaliaProdutividade_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "public"."User"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "produtividade_anomalia" ADD CONSTRAINT "AnomaliaProdutividade_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "public"."Demanda"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "produtividade_anomalia" ADD CONSTRAINT "AnomaliaProdutividade_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "public"."User"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "movimentacao" ADD CONSTRAINT "id_centro" FOREIGN KEY ("id_centro") REFERENCES "public"."Center"("centerId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movimentacao" ADD CONSTRAINT "id_usuario" FOREIGN KEY ("id_usuario") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movimentacao" ADD CONSTRAINT "id_executado_por" FOREIGN KEY ("executado_por") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transporte_anomalia" ADD CONSTRAINT "transporteId" FOREIGN KEY ("transporteId") REFERENCES "public"."Transporte"("numeroTransporte") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lite_validacao" ADD CONSTRAINT "adicionado_por" FOREIGN KEY ("adicionar_por") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lite_validacao" ADD CONSTRAINT "contado_por" FOREIGN KEY ("contado_por") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lite_validacao" ADD CONSTRAINT "center_id" FOREIGN KEY ("centro_id") REFERENCES "public"."Center"("centerId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lite_anomalia" ADD CONSTRAINT "add_por_id" FOREIGN KEY ("add_por") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lite_anomalia" ADD CONSTRAINT "centro_id" FOREIGN KEY ("centro_id") REFERENCES "public"."Center"("centerId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "UserCenter" ADD CONSTRAINT "UserCenter_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "UserCenter" ADD CONSTRAINT "UserCenter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "idx_demanda_center_id" ON "Demanda" USING btree ("centerId" text_ops);--> statement-breakpoint
CREATE INDEX "idx_demanda_center_processo" ON "Demanda" USING btree ("centerId" text_ops,"processo" text_ops);--> statement-breakpoint
CREATE INDEX "idx_demanda_criado_em" ON "Demanda" USING btree ("criadoEm" timestamp_ops);--> statement-breakpoint
CREATE INDEX "idx_demanda_funcionario_id" ON "Demanda" USING btree ("funcionarioId" text_ops);--> statement-breakpoint
CREATE INDEX "idx_demanda_id" ON "Demanda" USING btree ("id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_demanda_processo" ON "Demanda" USING btree ("processo" enum_ops);--> statement-breakpoint
CREATE INDEX "idx_demanda_status" ON "Demanda" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "idx_demanda_turno" ON "Demanda" USING btree ("turno" enum_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Configuracao_chave_centerId_key" ON "Configuracao" USING btree ("chave" text_ops,"centerId" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Center_centerId_key" ON "Center" USING btree ("centerId" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "DashboardProdutividadeCenter_centerId_processo_dataRegistro_key" ON "DashboardProdutividadeCenter" USING btree ("centerId" text_ops,"processo" enum_ops,"dataRegistro" timestamp_ops,"turno" enum_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "DashboardProdutividadeUser_funcionarioId_centerId_processo__key" ON "DashboardProdutividadeUser" USING btree ("funcionarioId" text_ops,"centerId" enum_ops,"processo" timestamp_ops,"dataRegistro" timestamp_ops,"turno" enum_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "ConfiguracaoImpressaoMapa_centerId_empresa_key" ON "ConfiguracaoImpressaoMapa" USING btree ("centerId" text_ops,"empresa" text_ops);--> statement-breakpoint
CREATE INDEX "idx_palete_demanda" ON "Palete" USING btree ("demandaId" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_palete_demanda_id" ON "Palete" USING btree ("demandaId" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_palete_empresa" ON "Palete" USING btree ("empresa" text_ops);--> statement-breakpoint
CREATE INDEX "idx_palete_id" ON "Palete" USING btree ("id" text_ops);--> statement-breakpoint
CREATE INDEX "idx_palete_segmento" ON "Palete" USING btree ("segmento" text_ops);--> statement-breakpoint
CREATE INDEX "idx_palete_transporte" ON "Palete" USING btree ("transporteId" text_ops);--> statement-breakpoint
CREATE INDEX "idx_palete_transporte_id" ON "Palete" USING btree ("transporteId" text_ops);--> statement-breakpoint
CREATE INDEX "idx_pausa_demanda_id" ON "Pausa" USING btree ("demandaId" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_transporte_data_expedicao" ON "Transporte" USING btree ("dataExpedicao" timestamp_ops);--> statement-breakpoint
CREATE INDEX "idx_transporte_numero_transporte" ON "Transporte" USING btree ("numeroTransporte" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "devolucao_check_list_demandaId_key" ON "devolucao_check_list" USING btree ("demandaId" int4_ops);--> statement-breakpoint
CREATE INDEX "devolucao_notas_idViagem_key" ON "devolucao_notas" USING btree ("notaFiscal" text_ops,"idViagemRavex" text_ops);--> statement-breakpoint
CREATE INDEX "idx_user_id" ON "User" USING btree ("id" text_ops);--> statement-breakpoint
CREATE INDEX "idx_user_name_trgm" ON "User" USING gin ("name" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX "rules_engines_centerId_enabled_idx" ON "rules_engines" USING btree ("centerId" bool_ops,"enabled" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "rules_engines_name_centerId_key" ON "rules_engines" USING btree ("name" text_ops,"centerId" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "devolucao_transportadoras_nome_centerId_key" ON "devolucao_transportadoras" USING btree ("nome" text_ops,"centerId" text_ops);--> statement-breakpoint
CREATE VIEW "public"."view_produtividade_por_funcionario_por_dia" AS (SELECT centerid, funcionarioid, funcionarionome, data, total_tempo_pausa, total_caixas, tempo_total, total_demandas, tempo_trabalhado, total_enderecos_visitados, CASE WHEN EXTRACT(epoch FROM tempo_trabalhado) > 0::numeric THEN total_caixas::numeric / (EXTRACT(epoch FROM tempo_trabalhado) / 3600::numeric) ELSE NULL::numeric END AS produtividade_caixa_por_hora, CASE WHEN total_demandas > 0 THEN total_enderecos_visitados::numeric / total_demandas::numeric ELSE NULL::numeric END AS media_enderecos_por_demanda FROM ( SELECT d."centerId" AS centerid, d."funcionarioId" AS funcionarioid, u.name AS funcionarionome, d."criadoEm"::date AS data, count(d.id) AS total_demandas, sum(p.fim - p.inicio) AS total_tempo_pausa, sum(palete."quantidadeCaixas") AS total_caixas, sum(d.fim - d.inicio) AS tempo_total, sum(palete."enderecoVisitado") AS total_enderecos_visitados, sum(d.fim - d.inicio) - sum(p.fim - p.inicio) AS tempo_trabalhado FROM "Demanda" d LEFT JOIN "User" u ON u.id = d."funcionarioId" LEFT JOIN "Pausa" p ON p."demandaId" = d.id LEFT JOIN "Palete" palete ON palete."demandaId" = d.id GROUP BY d."centerId", d."funcionarioId", u.name, (d."criadoEm"::date)) t ORDER BY centerid, funcionarioid, data);--> statement-breakpoint
CREATE VIEW "public"."view_produtividade_empresa" AS (SELECT d."centerId" AS centerid, palete.empresa, min(d."criadoEm"::date) AS periodo_inicio, max(d."criadoEm"::date) AS periodo_fim, sum( CASE WHEN p.id IS NOT NULL THEN p.fim - p.inicio ELSE NULL::interval END) AS total_tempo_pausa, sum( CASE WHEN palete.id IS NOT NULL THEN palete."quantidadeCaixas" ELSE NULL::integer END) AS total_caixas, sum(d.fim - d.inicio) AS tempo_total, count(d.id) AS total_demandas, sum( CASE WHEN palete.id IS NOT NULL THEN palete."enderecoVisitado" ELSE NULL::integer END) AS total_enderecos_visitados, sum(d.fim - d.inicio) - sum( CASE WHEN p.id IS NOT NULL THEN p.fim - p.inicio ELSE NULL::interval END) AS tempo_trabalhado, CASE WHEN EXTRACT(epoch FROM sum(d.fim - d.inicio) - sum( CASE WHEN p.id IS NOT NULL THEN p.fim - p.inicio ELSE NULL::interval END)) > 0::numeric THEN sum(palete."quantidadeCaixas")::numeric / (EXTRACT(epoch FROM sum(d.fim - d.inicio) - sum( CASE WHEN p.id IS NOT NULL THEN p.fim - p.inicio ELSE NULL::interval END)) / 3600::numeric) ELSE NULL::numeric END AS produtividade_caixa_por_hora, CASE WHEN count(d.id) > 0 THEN sum( CASE WHEN palete.id IS NOT NULL THEN palete."enderecoVisitado" ELSE NULL::integer END)::numeric / count(d.id)::numeric ELSE NULL::numeric END AS media_enderecos_por_demanda FROM "Demanda" d LEFT JOIN "Pausa" p ON p."demandaId" = d.id LEFT JOIN "Palete" palete ON palete."demandaId" = d.id GROUP BY d."centerId", palete.empresa);--> statement-breakpoint
CREATE VIEW "public"."view_produtivdade_processo" AS (SELECT d."centerId" AS centerid, d.processo, d.turno, d."criadoEm" AS criadoem, min(d."criadoEm"::date) AS periodo_inicio, max(d."criadoEm"::date) AS periodo_fim, sum( CASE WHEN p.id IS NOT NULL THEN p.fim - p.inicio ELSE NULL::interval END) AS total_tempo_pausa, sum( CASE WHEN palete.id IS NOT NULL THEN palete."quantidadeCaixas" ELSE NULL::integer END) AS total_caixas, sum(d.fim - d.inicio) AS tempo_total, count(d.id) AS total_demandas, sum( CASE WHEN palete.id IS NOT NULL THEN palete."enderecoVisitado" ELSE NULL::integer END) AS total_enderecos_visitados, sum(d.fim - d.inicio) - sum( CASE WHEN p.id IS NOT NULL THEN p.fim - p.inicio ELSE NULL::interval END) AS tempo_trabalhado, CASE WHEN EXTRACT(epoch FROM sum(d.fim - d.inicio) - sum( CASE WHEN p.id IS NOT NULL THEN p.fim - p.inicio ELSE NULL::interval END)) > 0::numeric THEN sum(palete."quantidadeCaixas")::numeric / (EXTRACT(epoch FROM sum(d.fim - d.inicio) - sum( CASE WHEN p.id IS NOT NULL THEN p.fim - p.inicio ELSE NULL::interval END)) / 3600::numeric) ELSE NULL::numeric END AS produtividade_caixa_por_hora, CASE WHEN count(d.id) > 0 THEN sum( CASE WHEN palete.id IS NOT NULL THEN palete."enderecoVisitado" ELSE NULL::integer END)::numeric / count(d.id)::numeric ELSE NULL::numeric END AS media_enderecos_por_demanda FROM "Demanda" d LEFT JOIN "Pausa" p ON p."demandaId" = d.id LEFT JOIN "Palete" palete ON palete."demandaId" = d.id GROUP BY d.processo, d.turno, d."criadoEm", d."centerId");--> statement-breakpoint
CREATE VIEW "public"."view_produtividade_por_dia" AS (SELECT centerid, data, total_tempo_pausa, total_caixas, tempo_total, tempo_trabalhado, processo, CASE WHEN EXTRACT(epoch FROM tempo_trabalhado) > 0::numeric THEN total_caixas::numeric / (EXTRACT(epoch FROM tempo_trabalhado) / 3600::numeric) ELSE NULL::numeric END AS produtividade_caixa_por_hora FROM ( SELECT d."centerId" AS centerid, d."criadoEm"::date AS data, d.processo, sum(p.fim - p.inicio) AS total_tempo_pausa, sum(palete."quantidadeCaixas") AS total_caixas, sum(d.fim - d.inicio) AS tempo_total, sum(d.fim - d.inicio) - sum(p.fim - p.inicio) AS tempo_trabalhado FROM "Demanda" d LEFT JOIN "Pausa" p ON p."demandaId" = d.id LEFT JOIN "Palete" palete ON palete."demandaId" = d.id GROUP BY d."centerId", d.processo, (d."criadoEm"::date)) t ORDER BY centerid, data);--> statement-breakpoint
CREATE VIEW "public"."view_demanda_produtividade" AS (SELECT centerid, demandaid, criadoporid, funcionarioid, nomefuncionario, data, turno, processo, inicio, fim, status, total_unidades, total_paletes, total_enderecos_visitado, total_tempo_pausa, total_caixas, tempo_total, qtd_paletes, segmento, empresa, tempo_trabalhado, CASE WHEN EXTRACT(epoch FROM tempo_trabalhado) > 0::numeric THEN total_caixas::numeric / (EXTRACT(epoch FROM tempo_trabalhado) / 3600::numeric) ELSE NULL::numeric END AS produtividade_caixa_por_hora FROM ( SELECT d."centerId" AS centerid, d."criadoEm"::date AS data, d.processo, d.status, d."cadastradoPorId" AS criadoporid, d."funcionarioId" AS funcionarioid, u.name AS nomefuncionario, min(palete.segmento) AS segmento, min(palete.empresa) AS empresa, d.turno, d.id AS demandaid, min(d.inicio) AS inicio, max(d.fim) AS fim, count(palete."demandaId") AS qtd_paletes, COALESCE(sum(p.fim - p.inicio), '00:00:00'::interval) AS total_tempo_pausa, sum(palete."quantidadeCaixas") AS total_caixas, sum(palete."quantidadeUnidades") AS total_unidades, sum(palete."enderecoVisitado") AS total_enderecos_visitado, sum(palete."quantidadePaletes") AS total_paletes, sum(d.fim - d.inicio) AS tempo_total, sum(d.fim - d.inicio) - COALESCE(sum(p.fim - p.inicio), '00:00:00'::interval) AS tempo_trabalhado FROM "Demanda" d LEFT JOIN "Pausa" p ON p."demandaId" = d.id LEFT JOIN "Palete" palete ON palete."demandaId" = d.id LEFT JOIN "User" u ON u.id = d."funcionarioId" GROUP BY d."cadastradoPorId", d."funcionarioId", d.id, u.name, d."centerId", (d."criadoEm"::date), d.processo, d.status, d.turno) t ORDER BY centerid, data);--> statement-breakpoint
CREATE VIEW "public"."view_produtividade_funcionario" AS (SELECT d."funcionarioId" AS funcionarioid, u.name AS funcionarionome, d.processo, d."centerId" AS centerid, d."criadoEm"::date AS dataregistro, min(d."criadoEm"::date) AS periodo_inicio, max(d."criadoEm"::date) AS periodo_fim, sum( CASE WHEN p.id IS NOT NULL THEN p.fim - p.inicio ELSE NULL::interval END) AS total_tempo_pausa, sum( CASE WHEN palete.id IS NOT NULL THEN palete."quantidadeCaixas" ELSE NULL::integer END) AS total_caixas, sum(d.fim - d.inicio) AS tempo_total, count(d.id) AS total_demandas, sum( CASE WHEN palete.id IS NOT NULL THEN palete."enderecoVisitado" ELSE NULL::integer END) AS total_enderecos_visitados, sum(d.fim - d.inicio) - sum( CASE WHEN p.id IS NOT NULL THEN p.fim - p.inicio ELSE NULL::interval END) AS tempo_trabalhado, CASE WHEN EXTRACT(epoch FROM sum(d.fim - d.inicio) - sum( CASE WHEN p.id IS NOT NULL THEN p.fim - p.inicio ELSE NULL::interval END)) > 0::numeric THEN sum(palete."quantidadeCaixas")::numeric / (EXTRACT(epoch FROM sum(d.fim - d.inicio) - sum( CASE WHEN p.id IS NOT NULL THEN p.fim - p.inicio ELSE NULL::interval END)) / 3600::numeric) ELSE NULL::numeric END AS produtividade_caixa_por_hora, CASE WHEN count(d.id) > 0 THEN sum( CASE WHEN palete.id IS NOT NULL THEN palete."enderecoVisitado" ELSE NULL::integer END)::numeric / count(d.id)::numeric ELSE NULL::numeric END AS media_enderecos_por_demanda, palete.segmento FROM "Demanda" d LEFT JOIN "User" u ON u.id = d."funcionarioId" LEFT JOIN "Pausa" p ON p."demandaId" = d.id LEFT JOIN "Palete" palete ON palete."demandaId" = d.id GROUP BY d."funcionarioId", u.name, d."centerId", d.processo, (d."criadoEm"::date), palete.segmento ORDER BY u.name);--> statement-breakpoint
CREATE VIEW "public"."vw_produtividade_dash" AS (WITH demanda_calculada AS ( SELECT d_1.id, d_1.processo, d_1.inicio, d_1.fim, d_1.status, d_1."cadastradoPorId", d_1.turno, d_1."funcionarioId", d_1."criadoEm", d_1."centerId", d_1.obs, d_1."dataExpedicao", ((d_1.inicio AT TIME ZONE 'UTC'::text) AT TIME ZONE 'America/Sao_Paulo'::text) AS inicio_ajustado, ((COALESCE(d_1.fim, (now() AT TIME ZONE 'UTC'::text)) AT TIME ZONE 'UTC'::text) AT TIME ZONE 'America/Sao_Paulo'::text) AS fim_ajustado, ((COALESCE(d_1.fim, (now() AT TIME ZONE 'UTC'::text)) AT TIME ZONE 'UTC'::text) AT TIME ZONE 'America/Sao_Paulo'::text) - ((d_1.inicio AT TIME ZONE 'UTC'::text) AT TIME ZONE 'America/Sao_Paulo'::text) AS tempo_bruto_interval FROM "Demanda" d_1 ), palete_aggregada AS ( SELECT "Palete"."demandaId", min("Palete"."transporteId") AS "transporteId", min("Palete".segmento) AS segmento, min("Palete".empresa) AS empresa, sum("Palete"."quantidadeCaixas") AS "quantidadeCaixas", sum("Palete"."quantidadeUnidades") AS "quantidadeUnidades", sum("Palete"."quantidadePaletes") AS "quantidadePaletes", sum("Palete"."enderecoVisitado") AS "enderecoVisitado" FROM "Palete" GROUP BY "Palete"."demandaId" ) SELECT d.id, d.processo, d.status, d.turno, d."cadastradoPorId", d."funcionarioId", u.name AS funcionario_nome, d."centerId", d.obs, pal."transporteId", pal.segmento, pal.empresa, pal."quantidadeCaixas", pal."quantidadeUnidades", pal."quantidadePaletes", pal."enderecoVisitado", ((d."criadoEm" AT TIME ZONE 'UTC'::text) AT TIME ZONE 'America/Sao_Paulo'::text) AS criado_em, to_char(((d."dataExpedicao" AT TIME ZONE 'UTC'::text) AT TIME ZONE 'America/Sao_Paulo'::text), 'YYYY-MM-DD'::text) AS data_expedicao, to_char(((d."dataExpedicao" AT TIME ZONE 'UTC'::text) AT TIME ZONE 'America/Sao_Paulo'::text), 'YYYY-MM'::text) AS mes, d.inicio_ajustado AS inicio_ts, d.fim_ajustado AS fim_ts, d.tempo_bruto_interval, CASE WHEN count(p.inicio) = 0 THEN NULL::interval ELSE sum(((COALESCE(p.fim, (now() AT TIME ZONE 'UTC'::text)) AT TIME ZONE 'UTC'::text) AT TIME ZONE 'America/Sao_Paulo'::text) - ((p.inicio AT TIME ZONE 'UTC'::text) AT TIME ZONE 'America/Sao_Paulo'::text)) END AS total_pausa_interval, to_char( CASE WHEN count(p.inicio) = 0 THEN NULL::interval ELSE sum(((COALESCE(p.fim, (now() AT TIME ZONE 'UTC'::text)) AT TIME ZONE 'UTC'::text) AT TIME ZONE 'America/Sao_Paulo'::text) - ((p.inicio AT TIME ZONE 'UTC'::text) AT TIME ZONE 'America/Sao_Paulo'::text)) END, 'HH24:MI'::text) AS total_pausa, to_char(d.tempo_bruto_interval - COALESCE(sum(((COALESCE(p.fim, (now() AT TIME ZONE 'UTC'::text)) AT TIME ZONE 'UTC'::text) AT TIME ZONE 'America/Sao_Paulo'::text) - ((p.inicio AT TIME ZONE 'UTC'::text) AT TIME ZONE 'America/Sao_Paulo'::text)), '00:00:00'::interval), 'HH24:MI'::text) AS tempo_trabalhado, ceil(pal."quantidadeCaixas"::numeric / NULLIF(pal."enderecoVisitado", 0)::numeric)::integer AS caixa_linha, ceil(pal."quantidadeCaixas"::numeric / NULLIF(EXTRACT(epoch FROM d.tempo_bruto_interval - COALESCE(sum(((COALESCE(p.fim, (now() AT TIME ZONE 'UTC'::text)) AT TIME ZONE 'UTC'::text) AT TIME ZONE 'America/Sao_Paulo'::text) - ((p.inicio AT TIME ZONE 'UTC'::text) AT TIME ZONE 'America/Sao_Paulo'::text)), '00:00:00'::interval)) / 3600.0, 0::numeric))::integer AS produtividade FROM demanda_calculada d LEFT JOIN "Pausa" p ON p."demandaId" = d.id LEFT JOIN palete_aggregada pal ON pal."demandaId" = d.id LEFT JOIN "User" u ON u.id = d."funcionarioId" GROUP BY d.id, d.processo, d.status, d.turno, d."cadastradoPorId", d."funcionarioId", u.name, d."centerId", d.obs, d."criadoEm", d."dataExpedicao", d.inicio_ajustado, d.fim_ajustado, d.tempo_bruto_interval, pal."transporteId", pal.segmento, pal.empresa, pal."quantidadeCaixas", pal."quantidadeUnidades", pal."quantidadePaletes", pal."enderecoVisitado");
*/