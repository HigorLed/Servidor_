-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           12.1.2-MariaDB - MariaDB Server
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.15.0.7171
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para escola
CREATE DATABASE IF NOT EXISTS `escola` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `escola`;

-- Copiando estrutura para tabela escola.alunos
CREATE TABLE IF NOT EXISTS `alunos` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOME` varchar(120) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela escola.alunos: ~4 rows (aproximadamente)
INSERT INTO `alunos` (`ID`, `NOME`) VALUES
	(1, 'JANSEN'),
	(2, 'VITOR'),
	(3, 'PEDRO'),
	(6, 'PAULO'),
	(7, 'DANILO'),
	(8, 'SANDRO'),
	(9, 'MARIA');

-- Copiando estrutura para tabela escola.cursos
CREATE TABLE IF NOT EXISTS `cursos` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOME_CURSO` varchar(120) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela escola.cursos: ~4 rows (aproximadamente)
INSERT INTO `cursos` (`ID`, `NOME_CURSO`) VALUES
	(1, 'Informatica'),
	(2, 'Administração'),
	(3, 'Mecânica'),
	(4, 'Eletrotécnica'),
	(6, 'Ferramentaria');

-- Copiando estrutura para tabela escola.matriculas
CREATE TABLE IF NOT EXISTS `matriculas` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ALUNO_ID` int(11) DEFAULT NULL,
  `CURSO_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ALUNO_ID` (`ALUNO_ID`),
  KEY `CURSO_ID` (`CURSO_ID`),
  CONSTRAINT `1` FOREIGN KEY (`ALUNO_ID`) REFERENCES `alunos` (`ID`),
  CONSTRAINT `2` FOREIGN KEY (`CURSO_ID`) REFERENCES `cursos` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela escola.matriculas: ~4 rows (aproximadamente)
INSERT INTO `matriculas` (`ID`, `ALUNO_ID`, `CURSO_ID`) VALUES
	(1, 1, 1),
	(2, 2, 1),
	(3, 3, 2),
	(4, 1, 2),
	(7, 9, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
