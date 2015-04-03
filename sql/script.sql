SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema park
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `park` DEFAULT CHARACTER SET utf8 ;
USE `park` ;

-- -----------------------------------------------------
-- Table `park`.`Role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `park`.`Role` (
  `idRole` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idRole`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB
COMMENT = '		';


-- -----------------------------------------------------
-- Table `park`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `park`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `idRole` INT NOT NULL,
  `login` VARCHAR(30) NOT NULL,
  `password` VARCHAR(256) NOT NULL,
  `first_name` VARCHAR(60) NOT NULL,
  `last_name` VARCHAR(60) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `reg_date` DATETIME NOT NULL,
  `status_banned` TINYINT(1) NOT NULL,
  `dob` DATE NOT NULL,
  `salt` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `login_UNIQUE` (`login` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `idRole` (`idRole` ASC),
  CONSTRAINT `idRole`
    FOREIGN KEY (`idRole`)
    REFERENCES `park`.`Role` (`idRole`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `park`.`News`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `park`.`News` (
  `idNews` INT NOT NULL AUTO_INCREMENT,
  `idUser` INT NOT NULL,
  `title` TEXT NOT NULL,
  `body` TEXT NOT NULL,
  `post_date` DATETIME NOT NULL,
  PRIMARY KEY (`idNews`),
  INDEX `userId_idx` (`idUser` ASC),
  CONSTRAINT `userId`
    FOREIGN KEY (`idUser`)
    REFERENCES `park`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '				';


-- -----------------------------------------------------
-- Table `park`.`Attraction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `park`.`Attraction` (
  `idAttraction` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  `prod_country` VARCHAR(45) NOT NULL,
  `places` INT NOT NULL,
  `att_picture` TEXT NOT NULL,
  `price_adult` INT NOT NULL,
  `price_child` INT NOT NULL,
  PRIMARY KEY (`idAttraction`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `park`.`Transaction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `park`.`Transaction` (
  `idTransaction` INT NOT NULL AUTO_INCREMENT,
  `idUser` INT NOT NULL,
  `transaction_date` DATETIME NOT NULL,
  `amount` INT NOT NULL,
  `transaction_status` VARCHAR(45) NOT NULL,
  `ticket_count` INT NOT NULL,
  PRIMARY KEY (`idTransaction`),
  INDEX `fk_Transaction_User1_idx` (`idUser` ASC),
  CONSTRAINT `fk_Transaction_User1`
    FOREIGN KEY (`idUser`)
    REFERENCES `park`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `park`.`Ticket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `park`.`Ticket` (
  `idTicket` INT NOT NULL AUTO_INCREMENT,
  `idAttraction` INT NOT NULL,
  `idTransaction` INT NOT NULL,
  `price` INT NOT NULL,
  `buy_date` DATETIME NOT NULL,
  `valid_date` DATETIME NOT NULL,
  PRIMARY KEY (`idTicket`),
  INDEX `attractionId_idx` (`idAttraction` ASC),
  INDEX `fk_Ticket_Transaction1_idx` (`idTransaction` ASC),
  CONSTRAINT `attractionId`
    FOREIGN KEY (`idAttraction`)
    REFERENCES `park`.`Attraction` (`idAttraction`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ticket_Transaction1`
    FOREIGN KEY (`idTransaction`)
    REFERENCES `park`.`Transaction` (`idTransaction`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `park`.`Comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `park`.`Comment` (
  `idComment` INT NOT NULL AUTO_INCREMENT,
  `idUser` INT NOT NULL,
  `idNews` INT NOT NULL,
  `body` VARCHAR(130) NOT NULL,
  `wrote_date` DATETIME NOT NULL,
  PRIMARY KEY (`idComment`),
  INDEX `userrId_idx` (`idUser` ASC),
  INDEX `news_id_idx` (`idNews` ASC),
  CONSTRAINT `userrId`
    FOREIGN KEY (`idUser`)
    REFERENCES `park`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `news_id`
    FOREIGN KEY (`idNews`)
    REFERENCES `park`.`News` (`idNews`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `park`.`Cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `park`.`Cart` (
  `idCart` INT NOT NULL AUTO_INCREMENT,
  `idUser` INT NOT NULL,
  PRIMARY KEY (`idCart`),
  INDEX `fk_Cart_User1_idx` (`idUser` ASC),
  CONSTRAINT `fk_Cart_User1`
    FOREIGN KEY (`idUser`)
    REFERENCES `park`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `park`.`Cart_Item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `park`.`Cart_Item` (
  `idCart_Item` INT NOT NULL AUTO_INCREMENT,
  `idCart` INT NOT NULL,
  `idAttraction` INT NOT NULL,
  `adult_quant` INT NOT NULL,
  `child_quant` INT NOT NULL,
  PRIMARY KEY (`idCart_Item`),
  INDEX `fk_Cart_Item_Cart1_idx` (`idCart` ASC),
  INDEX `fk_Cart_Item_Attraction1_idx` (`idAttraction` ASC),
  CONSTRAINT `fk_Cart_Item_Cart1`
    FOREIGN KEY (`idCart`)
    REFERENCES `park`.`Cart` (`idCart`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cart_Item_Attraction1`
    FOREIGN KEY (`idAttraction`)
    REFERENCES `park`.`Attraction` (`idAttraction`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `park`.`attraction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `park`.`attraction` (
  `idAttraction` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  `prod_country` VARCHAR(45) NOT NULL,
  `places` INT(11) NOT NULL,
  `att_picture` TEXT NOT NULL,
  `price_adult` INT(11) NOT NULL,
  `price_child` INT(11) NOT NULL,
  PRIMARY KEY (`idAttraction`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `park`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `park`.`role` (
  `idRole` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idRole`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8
COMMENT = '		';


-- -----------------------------------------------------
-- Table `park`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `park`.`user` (
  `idUser` INT(11) NOT NULL AUTO_INCREMENT,
  `idRole` INT(11) NOT NULL,
  `login` VARCHAR(30) NOT NULL,
  `password` VARCHAR(256) NOT NULL,
  `first_name` VARCHAR(60) NOT NULL,
  `last_name` VARCHAR(60) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `reg_date` DATETIME NOT NULL,
  `status_banned` TINYINT(1) NOT NULL,
  `dob` DATE NOT NULL,
  `salt` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `login_UNIQUE` (`login` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `idRole` (`idRole` ASC),
  CONSTRAINT `idRole`
    FOREIGN KEY (`idRole`)
    REFERENCES `park`.`role` (`idRole`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `park`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `park`.`cart` (
  `idCart` INT(11) NOT NULL AUTO_INCREMENT,
  `idUser` INT(11) NOT NULL,
  PRIMARY KEY (`idCart`),
  INDEX `fk_Cart_User1_idx` (`idUser` ASC),
  CONSTRAINT `fk_Cart_User1`
    FOREIGN KEY (`idUser`)
    REFERENCES `park`.`user` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `park`.`cart_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `park`.`cart_item` (
  `idCart_Item` INT(11) NOT NULL AUTO_INCREMENT,
  `idCart` INT(11) NOT NULL,
  `idAttraction` INT(11) NOT NULL,
  `adult_quant` INT(11) NOT NULL,
  `child_quant` INT(11) NOT NULL,
  PRIMARY KEY (`idCart_Item`),
  INDEX `fk_Cart_Item_Cart1_idx` (`idCart` ASC),
  INDEX `fk_Cart_Item_Attraction1_idx` (`idAttraction` ASC),
  CONSTRAINT `fk_Cart_Item_Attraction1`
    FOREIGN KEY (`idAttraction`)
    REFERENCES `park`.`attraction` (`idAttraction`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cart_Item_Cart1`
    FOREIGN KEY (`idCart`)
    REFERENCES `park`.`cart` (`idCart`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `park`.`news`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `park`.`news` (
  `idNews` INT(11) NOT NULL AUTO_INCREMENT,
  `idUser` INT(11) NOT NULL,
  `title` TEXT NOT NULL,
  `body` TEXT NOT NULL,
  `post_date` DATETIME NOT NULL,
  PRIMARY KEY (`idNews`),
  INDEX `userId_idx` (`idUser` ASC),
  CONSTRAINT `userId`
    FOREIGN KEY (`idUser`)
    REFERENCES `park`.`user` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '				';


-- -----------------------------------------------------
-- Table `park`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `park`.`comment` (
  `idComment` INT(11) NOT NULL AUTO_INCREMENT,
  `idUser` INT(11) NOT NULL,
  `idNews` INT(11) NOT NULL,
  `body` VARCHAR(130) NOT NULL,
  `wrote_date` DATETIME NOT NULL,
  PRIMARY KEY (`idComment`),
  INDEX `userrId_idx` (`idUser` ASC),
  INDEX `news_id_idx` (`idNews` ASC),
  CONSTRAINT `news_id`
    FOREIGN KEY (`idNews`)
    REFERENCES `park`.`news` (`idNews`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userrId`
    FOREIGN KEY (`idUser`)
    REFERENCES `park`.`user` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `park`.`transaction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `park`.`transaction` (
  `idTransaction` INT(11) NOT NULL AUTO_INCREMENT,
  `idUser` INT(11) NOT NULL,
  `transaction_date` DATETIME NOT NULL,
  `amount` INT(11) NOT NULL,
  `transaction_status` VARCHAR(45) NOT NULL,
  `ticket_count` INT(11) NOT NULL,
  PRIMARY KEY (`idTransaction`),
  INDEX `fk_Transaction_User1_idx` (`idUser` ASC),
  CONSTRAINT `fk_Transaction_User1`
    FOREIGN KEY (`idUser`)
    REFERENCES `park`.`user` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `park`.`ticket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `park`.`ticket` (
  `idTicket` INT(11) NOT NULL AUTO_INCREMENT,
  `idAttraction` INT(11) NOT NULL,
  `idTransaction` INT(11) NOT NULL,
  `price` INT(11) NOT NULL,
  `buy_date` DATETIME NOT NULL,
  `valid_date` DATETIME NOT NULL,
  PRIMARY KEY (`idTicket`),
  INDEX `attractionId_idx` (`idAttraction` ASC),
  INDEX `fk_Ticket_Transaction1_idx` (`idTransaction` ASC),
  CONSTRAINT `attractionId`
    FOREIGN KEY (`idAttraction`)
    REFERENCES `park`.`attraction` (`idAttraction`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ticket_Transaction1`
    FOREIGN KEY (`idTransaction`)
    REFERENCES `park`.`transaction` (`idTransaction`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
