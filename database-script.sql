USE [master]
GO

/****** Object:  Database [Chatify]    Script Date: 6/2/2024 10:10:51 AM ******/
CREATE DATABASE [Chatify]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'chatify', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\chatify.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'chatify_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\chatify_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Chatify].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [Chatify] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [Chatify] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [Chatify] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [Chatify] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [Chatify] SET ARITHABORT OFF 
GO

ALTER DATABASE [Chatify] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [Chatify] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [Chatify] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [Chatify] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [Chatify] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [Chatify] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [Chatify] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [Chatify] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [Chatify] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [Chatify] SET  DISABLE_BROKER 
GO

ALTER DATABASE [Chatify] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [Chatify] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [Chatify] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [Chatify] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [Chatify] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [Chatify] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [Chatify] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [Chatify] SET RECOVERY SIMPLE 
GO

ALTER DATABASE [Chatify] SET  MULTI_USER 
GO

ALTER DATABASE [Chatify] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [Chatify] SET DB_CHAINING OFF 
GO

ALTER DATABASE [Chatify] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [Chatify] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO

ALTER DATABASE [Chatify] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [Chatify] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO

ALTER DATABASE [Chatify] SET QUERY_STORE = OFF
GO

ALTER DATABASE [Chatify] SET  READ_WRITE 
GO

USE [Chatify]
GO
/****** Object:  Table [dbo].[comment]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[comment](
	[comment_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[post_id] [int] NOT NULL,
	[comment_text] [nvarchar](max) NOT NULL,
	[comment_date] [datetime] NOT NULL,
	[like_count] [int] NULL,
 CONSTRAINT [PK_comment] PRIMARY KEY CLUSTERED 
(
	[comment_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[comment_love]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[comment_love](
	[comment_like_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[comment_id] [int] NOT NULL,
	[comment_like_date] [datetime] NOT NULL,
 CONSTRAINT [PK_comment_love] PRIMARY KEY CLUSTERED 
(
	[comment_like_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[continent]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[continent](
	[continent_id] [int] IDENTITY(1,1) NOT NULL,
	[continent_name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_continent] PRIMARY KEY CLUSTERED 
(
	[continent_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[continent_country]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[continent_country](
	[continent_country_id] [int] IDENTITY(1,1) NOT NULL,
	[continent_id] [int] NOT NULL,
	[country_id] [int] NOT NULL,
 CONSTRAINT [PK_continent_country_id] PRIMARY KEY CLUSTERED 
(
	[continent_country_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[country]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[country](
	[country_id] [int] IDENTITY(1,1) NOT NULL,
	[country_name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_country] PRIMARY KEY CLUSTERED 
(
	[country_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[group]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[group](
	[group_id] [int] IDENTITY(1,1) NOT NULL,
	[group_name] [nvarchar](50) NOT NULL,
	[creation_date] [datetime] NOT NULL,
	[description] [nvarchar](max) NOT NULL,
	[group_image_src] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_group] PRIMARY KEY CLUSTERED 
(
	[group_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[group_conversation]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[group_conversation](
	[conversation_id] [int] IDENTITY(1,1) NOT NULL,
	[group_id] [int] NOT NULL,
	[last_message_date] [datetime] NOT NULL,
 CONSTRAINT [PK_group_conversation] PRIMARY KEY CLUSTERED 
(
	[conversation_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[group_member]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[group_member](
	[group_member_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[group_id] [int] NOT NULL,
	[join_date] [datetime] NOT NULL,
	[group_role_id] [int] NOT NULL,
 CONSTRAINT [PK_group_member] PRIMARY KEY CLUSTERED 
(
	[group_member_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[group_message]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[group_message](
	[message_id] [int] IDENTITY(1,1) NOT NULL,
	[sender_id] [int] NOT NULL,
	[group_id] [int] NOT NULL,
	[message_text] [nvarchar](max) NOT NULL,
	[message_date] [datetime] NOT NULL,
 CONSTRAINT [PK_group_message] PRIMARY KEY CLUSTERED 
(
	[message_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[group_role]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[group_role](
	[group_role_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_group_role] PRIMARY KEY CLUSTERED 
(
	[group_role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[love]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[love](
	[like_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[post_id] [int] NOT NULL,
	[like_date] [datetime] NOT NULL,
 CONSTRAINT [PK_love] PRIMARY KEY CLUSTERED 
(
	[like_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[message]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[message](
	[message_id] [int] IDENTITY(1,1) NOT NULL,
	[sender_id] [int] NOT NULL,
	[recipient_id] [int] NOT NULL,
	[message_text] [nvarchar](max) NULL,
	[message_date] [datetime] NOT NULL,
 CONSTRAINT [PK_message] PRIMARY KEY CLUSTERED 
(
	[message_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[message_conversation]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[message_conversation](
	[conversation_id] [int] IDENTITY(1,1) NOT NULL,
	[user1_id] [int] NOT NULL,
	[user2_id] [int] NOT NULL,
	[last_message_date] [datetime] NOT NULL,
 CONSTRAINT [PK_message_conversation] PRIMARY KEY CLUSTERED 
(
	[conversation_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[notification]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[notification](
	[notification_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[notification_text] [nvarchar](max) NOT NULL,
	[notification_date] [datetime] NOT NULL,
	[is_read] [bit] NOT NULL,
 CONSTRAINT [PK_notification] PRIMARY KEY CLUSTERED 
(
	[notification_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[post]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[post](
	[post_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[post_description] [nvarchar](max) NULL,
	[post_date] [datetime] NOT NULL,
	[like_count] [int] NULL,
	[comment_count] [int] NULL,
 CONSTRAINT [PK_post] PRIMARY KEY CLUSTERED 
(
	[post_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[post_file]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[post_file](
	[post_file_id] [int] IDENTITY(1,1) NOT NULL,
	[file_src] [nvarchar](255) NOT NULL,
	[file_type] [nvarchar](50) NOT NULL,
	[post_id] [int] NOT NULL,
 CONSTRAINT [PK_post_file] PRIMARY KEY CLUSTERED 
(
	[post_file_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[report]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[report](
	[report_id] [int] IDENTITY(1,1) NOT NULL,
	[reporter_id] [int] NOT NULL,
	[reported_user_id] [int] NOT NULL,
	[report_date] [datetime] NOT NULL,
	[report_reason_id] [int] NOT NULL,
	[report_text] [nvarchar](max) NULL,
 CONSTRAINT [PK_report] PRIMARY KEY CLUSTERED 
(
	[report_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[report_reason]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[report_reason](
	[report_reason_id] [int] IDENTITY(1,1) NOT NULL,
	[reason] [nvarchar](255) NOT NULL,
	[detail] [nvarchar](max) NULL,
 CONSTRAINT [PK_report_reason] PRIMARY KEY CLUSTERED 
(
	[report_reason_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[role](
	[role_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_role] PRIMARY KEY CLUSTERED 
(
	[role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[full_name] [nvarchar](255) NOT NULL,
	[username] [nvarchar](50) NOT NULL,
	[email] [nvarchar](255) NOT NULL,
	[password] [nvarchar](255) NOT NULL,
	[biography] [nvarchar](100) NULL,
	[profile_picture_src] [nvarchar](100) NOT NULL,
	[register_date] [datetime] NOT NULL,
	[country_id] [int] NOT NULL,
	[role_id] [int] NOT NULL,
 CONSTRAINT [PK_user] PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user_follower]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_follower](
	[follower_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[follower_user_id] [int] NOT NULL,
	[follow_date] [datetime] NOT NULL,
 CONSTRAINT [PK_user_follower] PRIMARY KEY CLUSTERED 
(
	[follower_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user_login]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_login](
	[login_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[login_date] [datetime] NOT NULL,
 CONSTRAINT [PK_user_login] PRIMARY KEY CLUSTERED 
(
	[login_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[comment] ON 
GO
INSERT [dbo].[comment] ([comment_id], [user_id], [post_id], [comment_text], [comment_date], [like_count]) VALUES (1, 6, 6, N'What a post description, man 👏', CAST(N'2023-08-04T16:40:46.650' AS DateTime), 0)
GO
INSERT [dbo].[comment] ([comment_id], [user_id], [post_id], [comment_text], [comment_date], [like_count]) VALUES (3, 9, 5, N'Nice cars man. I hope one day I too will have BMW', CAST(N'2023-08-05T11:01:05.100' AS DateTime), NULL)
GO
INSERT [dbo].[comment] ([comment_id], [user_id], [post_id], [comment_text], [comment_date], [like_count]) VALUES (4, 12, 5, N'Wassup', CAST(N'2024-04-13T15:03:51.773' AS DateTime), NULL)
GO
SET IDENTITY_INSERT [dbo].[comment] OFF
GO
SET IDENTITY_INSERT [dbo].[continent] ON 
GO
INSERT [dbo].[continent] ([continent_id], [continent_name]) VALUES (1, N'Africa')
GO
INSERT [dbo].[continent] ([continent_id], [continent_name]) VALUES (2, N'Asia')
GO
INSERT [dbo].[continent] ([continent_id], [continent_name]) VALUES (3, N'Europe')
GO
INSERT [dbo].[continent] ([continent_id], [continent_name]) VALUES (4, N'North America')
GO
INSERT [dbo].[continent] ([continent_id], [continent_name]) VALUES (5, N'South America')
GO
INSERT [dbo].[continent] ([continent_id], [continent_name]) VALUES (6, N'Australia')
GO
SET IDENTITY_INSERT [dbo].[continent] OFF
GO
SET IDENTITY_INSERT [dbo].[continent_country] ON 
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (1, 3, 1)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (2, 3, 109)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (3, 3, 110)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (4, 3, 111)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (5, 3, 112)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (6, 3, 113)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (7, 3, 114)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (8, 3, 115)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (9, 3, 116)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (10, 3, 117)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (11, 3, 118)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (12, 3, 119)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (13, 3, 120)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (14, 3, 121)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (15, 3, 122)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (16, 3, 123)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (17, 3, 124)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (18, 3, 125)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (19, 3, 126)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (20, 3, 127)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (21, 3, 128)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (22, 3, 129)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (23, 3, 130)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (24, 3, 131)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (25, 3, 132)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (26, 3, 133)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (27, 3, 134)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (28, 3, 135)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (29, 3, 136)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (30, 3, 137)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (31, 3, 138)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (32, 3, 139)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (33, 3, 140)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (34, 3, 141)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (35, 3, 142)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (36, 3, 143)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (37, 3, 144)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (38, 3, 145)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (39, 3, 146)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (40, 3, 147)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (41, 3, 148)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (42, 3, 149)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (43, 3, 150)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (44, 3, 151)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (45, 4, 152)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (46, 4, 153)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (47, 4, 154)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (48, 4, 155)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (49, 4, 156)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (50, 4, 157)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (51, 4, 158)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (52, 4, 159)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (53, 4, 160)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (54, 4, 161)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (55, 4, 162)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (56, 4, 163)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (57, 4, 164)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (58, 4, 165)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (59, 4, 166)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (60, 4, 167)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (61, 4, 168)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (62, 4, 169)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (63, 4, 170)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (64, 4, 171)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (65, 4, 172)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (66, 4, 173)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (67, 4, 174)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (68, 4, 175)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (69, 5, 176)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (70, 5, 177)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (71, 5, 178)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (72, 5, 179)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (73, 5, 180)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (74, 5, 181)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (75, 5, 182)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (76, 5, 183)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (77, 5, 184)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (78, 5, 185)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (79, 5, 186)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (80, 5, 187)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (81, 5, 188)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (95, 6, 189)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (96, 6, 190)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (97, 6, 191)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (98, 6, 192)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (99, 6, 193)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (100, 6, 194)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (101, 6, 195)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (102, 6, 196)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (103, 6, 197)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (104, 6, 198)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (105, 6, 199)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (106, 6, 200)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (107, 6, 201)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (108, 6, 202)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (109, 2, 117)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (110, 2, 143)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (111, 2, 248)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (112, 2, 249)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (113, 2, 250)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (114, 2, 251)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (115, 2, 252)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (116, 2, 253)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (117, 2, 254)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (118, 2, 255)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (119, 2, 256)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (120, 2, 257)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (121, 2, 258)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (122, 2, 259)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (123, 2, 260)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (124, 2, 261)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (125, 2, 262)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (126, 2, 263)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (127, 2, 264)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (128, 2, 265)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (129, 2, 266)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (130, 2, 267)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (131, 2, 268)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (132, 2, 269)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (133, 2, 270)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (134, 2, 271)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (135, 2, 272)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (136, 2, 273)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (137, 2, 274)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (138, 2, 275)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (139, 2, 276)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (140, 2, 277)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (141, 2, 278)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (142, 2, 279)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (143, 2, 280)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (144, 2, 281)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (145, 2, 282)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (146, 2, 283)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (147, 2, 284)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (148, 2, 285)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (149, 2, 286)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (150, 2, 287)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (151, 2, 288)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (152, 2, 289)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (153, 2, 290)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (154, 2, 291)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (155, 2, 292)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (156, 2, 293)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (157, 1, 294)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (158, 1, 295)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (159, 1, 296)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (160, 1, 297)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (161, 1, 298)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (162, 1, 299)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (163, 1, 300)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (164, 1, 301)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (165, 1, 302)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (166, 1, 303)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (167, 1, 304)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (168, 1, 305)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (169, 1, 306)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (170, 1, 307)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (171, 1, 308)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (172, 1, 309)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (173, 1, 310)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (174, 1, 311)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (175, 1, 312)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (176, 1, 313)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (177, 1, 314)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (178, 1, 315)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (179, 1, 316)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (180, 1, 317)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (181, 1, 318)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (182, 1, 319)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (183, 1, 320)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (184, 1, 321)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (185, 1, 322)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (186, 1, 323)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (187, 1, 324)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (188, 1, 325)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (189, 1, 326)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (190, 1, 327)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (191, 1, 328)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (192, 1, 329)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (193, 1, 330)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (194, 1, 331)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (195, 1, 332)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (196, 1, 333)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (197, 1, 334)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (198, 1, 335)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (199, 1, 336)
GO
INSERT [dbo].[continent_country] ([continent_country_id], [continent_id], [country_id]) VALUES (200, 1, 337)
GO
SET IDENTITY_INSERT [dbo].[continent_country] OFF
GO
SET IDENTITY_INSERT [dbo].[country] ON 
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (262, N'Afghanistan')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (109, N'Albania')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (302, N'Algeria')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (110, N'Andorra')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (305, N'Angola')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (173, N'Antigua and Barbuda')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (177, N'Argentina')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (288, N'Armenia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (189, N'Australia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (111, N'Austria')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (274, N'Azerbaijan')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (166, N'Bahamas')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (290, N'Bahrain')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (252, N'Bangladesh')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (168, N'Barbados')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (112, N'Belarus')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (113, N'Belgium')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (156, N'Belize')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (321, N'Benin')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (175, N'Bermuda')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (292, N'Bhutan')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (183, N'Bolivia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (114, N'Bosnia and Herzegovina')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (335, N'Botswana')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (176, N'Brazil')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (115, N'Bulgaria')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (311, N'Burkina Faso')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (322, N'Burundi')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (272, N'Cambodia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (309, N'Cameroon')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (152, N'Canada')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (330, N'Central African Republic')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (316, N'Chad')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (181, N'Chile')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (248, N'China')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (178, N'Colombia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (328, N'Congo')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (159, N'Costa Rica')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (116, N'Croatia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (165, N'Cuba')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (117, N'Cyprus')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (118, N'Czech Republic')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (297, N'Democratic Republic of the Congo')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (119, N'Denmark')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (174, N'Dominica')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (164, N'Dominican Republic')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (182, N'Ecuador')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (296, N'Egypt')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (158, N'El Salvador')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (332, N'Eritrea')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (120, N'Estonia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (295, N'Ethiopia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (192, N'Fiji')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (121, N'Finland')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (122, N'France')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (188, N'French Guiana')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (336, N'Gabon')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (334, N'Gambia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (286, N'Georgia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (123, N'Germany')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (307, N'Ghana')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (124, N'Greece')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (169, N'Grenada')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (155, N'Guatemala')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (319, N'Guinea')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (186, N'Guyana')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (163, N'Haiti')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (157, N'Honduras')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (125, N'Hungary')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (126, N'Iceland')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (249, N'India')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (250, N'Indonesia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (257, N'Iran')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (261, N'Iraq')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (127, N'Ireland')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (277, N'Israel')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (128, N'Italy')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (162, N'Jamaica')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (253, N'Japan')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (273, N'Jordan')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (270, N'Kazakhstan')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (300, N'Kenya')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (196, N'Kiribati')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (285, N'Kuwait')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (280, N'Kyrgyzstan')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (278, N'Laos')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (129, N'Latvia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (279, N'Lebanon')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (337, N'Lesotho')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (329, N'Liberia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (327, N'Libya')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (130, N'Liechtenstein')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (131, N'Lithuania')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (132, N'Luxembourg')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (308, N'Madagascar')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (313, N'Malawi')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (265, N'Malaysia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (293, N'Maldives')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (312, N'Mali')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (133, N'Malta')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (199, N'Marshall Islands')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (331, N'Mauritania')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (154, N'Mexico')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (198, N'Micronesia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (134, N'Moldova')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (135, N'Monaco')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (287, N'Mongolia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (136, N'Montenegro')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (304, N'Morocco')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (306, N'Mozambique')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (259, N'Myanmar')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (333, N'Namibia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (202, N'Nauru')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (267, N'Nepal')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (137, N'Netherlands')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (190, N'New Zealand')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (160, N'Nicaragua')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (310, N'Niger')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (294, N'Nigeria')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (268, N'North Korea')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (138, N'North Macedonia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (139, N'Norway')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (284, N'Oman')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (251, N'Pakistan')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (200, N'Palau')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (161, N'Panama')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (191, N'Papua New Guinea')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (184, N'Paraguay')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (179, N'Peru')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (254, N'Philippines')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (140, N'Poland')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (141, N'Portugal')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (289, N'Qatar')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (142, N'Romania')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (143, N'Russia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (320, N'Rwanda')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (170, N'Saint Kitts and Nevis')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (171, N'Saint Lucia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (172, N'Saint Vincent and the Grenadines')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (195, N'Samoa')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (144, N'San Marino')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (263, N'Saudi Arabia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (315, N'Senegal')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (1, N'Serbia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (326, N'Sierra Leone')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (282, N'Singapore')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (145, N'Slovakia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (146, N'Slovenia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (193, N'Solomon Islands')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (317, N'Somalia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (298, N'South Africa')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (260, N'South Korea')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (324, N'South Sudan')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (147, N'Spain')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (269, N'Sri Lanka')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (283, N'State of Palestine')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (303, N'Sudan')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (187, N'Suriname')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (148, N'Sweden')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (149, N'Switzerland')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (271, N'Syria')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (276, N'Tajikistan')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (299, N'Tanzania')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (258, N'Thailand')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (291, N'Timor-Leste')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (325, N'Togo')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (197, N'Tonga')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (167, N'Trinidad and Tobago')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (323, N'Tunisia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (256, N'Turkey')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (281, N'Turkmenistan')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (201, N'Tuvalu')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (301, N'Uganda')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (150, N'Ukraine')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (275, N'United Arab Emirates')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (151, N'United Kingdom')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (153, N'United States')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (185, N'Uruguay')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (264, N'Uzbekistan')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (194, N'Vanuatu')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (180, N'Venezuela')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (255, N'Vietnam')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (266, N'Yemen')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (314, N'Zambia')
GO
INSERT [dbo].[country] ([country_id], [country_name]) VALUES (318, N'Zimbabwe')
GO
SET IDENTITY_INSERT [dbo].[country] OFF
GO
SET IDENTITY_INSERT [dbo].[group] ON 
GO
INSERT [dbo].[group] ([group_id], [group_name], [creation_date], [description], [group_image_src]) VALUES (1, N'ShifuClan', CAST(N'2023-08-10T21:50:06.327' AS DateTime), N'Welcome my dear friends!
We are the strongest among the strongest!!! 👊💪💪', N'1692504209575.jpg')
GO
SET IDENTITY_INSERT [dbo].[group] OFF
GO
SET IDENTITY_INSERT [dbo].[group_conversation] ON 
GO
INSERT [dbo].[group_conversation] ([conversation_id], [group_id], [last_message_date]) VALUES (1, 1, CAST(N'2023-08-13T16:56:43.483' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[group_conversation] OFF
GO
SET IDENTITY_INSERT [dbo].[group_member] ON 
GO
INSERT [dbo].[group_member] ([group_member_id], [user_id], [group_id], [join_date], [group_role_id]) VALUES (1, 9, 1, CAST(N'2023-08-10T21:50:06.330' AS DateTime), 1)
GO
INSERT [dbo].[group_member] ([group_member_id], [user_id], [group_id], [join_date], [group_role_id]) VALUES (2, 6, 1, CAST(N'2023-08-10T21:50:06.330' AS DateTime), 2)
GO
INSERT [dbo].[group_member] ([group_member_id], [user_id], [group_id], [join_date], [group_role_id]) VALUES (1002, 4, 1, CAST(N'2023-08-20T12:46:59.360' AS DateTime), 3)
GO
INSERT [dbo].[group_member] ([group_member_id], [user_id], [group_id], [join_date], [group_role_id]) VALUES (1007, 5, 1, CAST(N'2023-09-24T09:14:07.627' AS DateTime), 3)
GO
SET IDENTITY_INSERT [dbo].[group_member] OFF
GO
SET IDENTITY_INSERT [dbo].[group_message] ON 
GO
INSERT [dbo].[group_message] ([message_id], [sender_id], [group_id], [message_text], [message_date]) VALUES (1, 6, 1, N'Ja sam pravi admin!!', CAST(N'2023-08-12T21:02:57.473' AS DateTime))
GO
INSERT [dbo].[group_message] ([message_id], [sender_id], [group_id], [message_text], [message_date]) VALUES (3, 9, 1, N'ja sam glavni stab', CAST(N'2023-08-12T21:13:13.910' AS DateTime))
GO
INSERT [dbo].[group_message] ([message_id], [sender_id], [group_id], [message_text], [message_date]) VALUES (4, 6, 1, N'postavi me za admina', CAST(N'2023-08-12T21:14:40.640' AS DateTime))
GO
INSERT [dbo].[group_message] ([message_id], [sender_id], [group_id], [message_text], [message_date]) VALUES (5, 5, 1, N'ala ste navalili', CAST(N'2023-08-12T21:21:38.083' AS DateTime))
GO
INSERT [dbo].[group_message] ([message_id], [sender_id], [group_id], [message_text], [message_date]) VALUES (6, 5, 1, N'idemo na zenba?', CAST(N'2023-08-12T21:22:39.237' AS DateTime))
GO
INSERT [dbo].[group_message] ([message_id], [sender_id], [group_id], [message_text], [message_date]) VALUES (7, 6, 1, N'ajmo u petak', CAST(N'2023-08-12T21:24:40.120' AS DateTime))
GO
INSERT [dbo].[group_message] ([message_id], [sender_id], [group_id], [message_text], [message_date]) VALUES (8, 5, 1, N'moree', CAST(N'2023-08-12T21:39:17.503' AS DateTime))
GO
INSERT [dbo].[group_message] ([message_id], [sender_id], [group_id], [message_text], [message_date]) VALUES (9, 9, 1, N'Zvacu darkica ako moze', CAST(N'2023-08-13T16:52:32.847' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[group_message] OFF
GO
SET IDENTITY_INSERT [dbo].[group_role] ON 
GO
INSERT [dbo].[group_role] ([group_role_id], [name]) VALUES (1, N'Admin')
GO
INSERT [dbo].[group_role] ([group_role_id], [name]) VALUES (2, N'Moderator')
GO
INSERT [dbo].[group_role] ([group_role_id], [name]) VALUES (3, N'Guest')
GO
SET IDENTITY_INSERT [dbo].[group_role] OFF
GO
SET IDENTITY_INSERT [dbo].[love] ON 
GO
INSERT [dbo].[love] ([like_id], [user_id], [post_id], [like_date]) VALUES (17, 6, 6, CAST(N'2023-08-05T09:42:17.680' AS DateTime))
GO
INSERT [dbo].[love] ([like_id], [user_id], [post_id], [like_date]) VALUES (19, 9, 5, CAST(N'2023-08-10T12:06:10.747' AS DateTime))
GO
INSERT [dbo].[love] ([like_id], [user_id], [post_id], [like_date]) VALUES (1019, 12, 5, CAST(N'2024-04-13T15:03:54.720' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[love] OFF
GO
SET IDENTITY_INSERT [dbo].[message] ON 
GO
INSERT [dbo].[message] ([message_id], [sender_id], [recipient_id], [message_text], [message_date]) VALUES (7, 9, 5, N'ajmo baki na zenba
😎', CAST(N'2023-08-08T18:53:30.737' AS DateTime))
GO
INSERT [dbo].[message] ([message_id], [sender_id], [recipient_id], [message_text], [message_date]) VALUES (8, 5, 9, N'Moze naravno kad hoces', CAST(N'2023-08-08T22:52:15.383' AS DateTime))
GO
INSERT [dbo].[message] ([message_id], [sender_id], [recipient_id], [message_text], [message_date]) VALUES (9, 5, 9, N'Ja mogu oko 10', CAST(N'2023-08-08T22:56:11.223' AS DateTime))
GO
INSERT [dbo].[message] ([message_id], [sender_id], [recipient_id], [message_text], [message_date]) VALUES (10, 9, 5, N'Moze sine taman da se razbudimo', CAST(N'2023-08-08T22:58:03.703' AS DateTime))
GO
INSERT [dbo].[message] ([message_id], [sender_id], [recipient_id], [message_text], [message_date]) VALUES (11, 5, 9, N'more', CAST(N'2023-08-08T22:59:46.253' AS DateTime))
GO
INSERT [dbo].[message] ([message_id], [sender_id], [recipient_id], [message_text], [message_date]) VALUES (13, 5, 9, N'ajviecemo', CAST(N'2023-08-08T23:01:45.710' AS DateTime))
GO
INSERT [dbo].[message] ([message_id], [sender_id], [recipient_id], [message_text], [message_date]) VALUES (14, 9, 5, N'aj samo ponesi koju kintu ja nemam', CAST(N'2023-08-08T23:02:14.327' AS DateTime))
GO
INSERT [dbo].[message] ([message_id], [sender_id], [recipient_id], [message_text], [message_date]) VALUES (15, 5, 9, N'Vazi', CAST(N'2023-08-08T23:02:40.510' AS DateTime))
GO
INSERT [dbo].[message] ([message_id], [sender_id], [recipient_id], [message_text], [message_date]) VALUES (18, 5, 9, N'tako', CAST(N'2023-08-08T23:17:44.813' AS DateTime))
GO
INSERT [dbo].[message] ([message_id], [sender_id], [recipient_id], [message_text], [message_date]) VALUES (21, 9, 5, N'alo brate sta se desava???', CAST(N'2023-08-12T17:14:52.100' AS DateTime))
GO
INSERT [dbo].[message] ([message_id], [sender_id], [recipient_id], [message_text], [message_date]) VALUES (22, 5, 9, N'Ja zaboravijo 😅', CAST(N'2023-08-12T17:17:39.900' AS DateTime))
GO
INSERT [dbo].[message] ([message_id], [sender_id], [recipient_id], [message_text], [message_date]) VALUES (23, 9, 5, N'Kako to brate', CAST(N'2023-08-12T17:18:04.223' AS DateTime))
GO
INSERT [dbo].[message] ([message_id], [sender_id], [recipient_id], [message_text], [message_date]) VALUES (26, 9, 5, N'bOBI?', CAST(N'2023-08-12T17:18:54.760' AS DateTime))
GO
INSERT [dbo].[message] ([message_id], [sender_id], [recipient_id], [message_text], [message_date]) VALUES (27, 5, 9, N'E', CAST(N'2023-08-12T17:18:57.537' AS DateTime))
GO
INSERT [dbo].[message] ([message_id], [sender_id], [recipient_id], [message_text], [message_date]) VALUES (29, 9, 5, N'HAHAHHA', CAST(N'2023-08-12T17:19:16.730' AS DateTime))
GO
INSERT [dbo].[message] ([message_id], [sender_id], [recipient_id], [message_text], [message_date]) VALUES (32, 9, 5, N'alo be', CAST(N'2023-08-12T18:07:54.560' AS DateTime))
GO
INSERT [dbo].[message] ([message_id], [sender_id], [recipient_id], [message_text], [message_date]) VALUES (34, 9, 5, N'majstore', CAST(N'2023-08-12T18:31:59.617' AS DateTime))
GO
INSERT [dbo].[message] ([message_id], [sender_id], [recipient_id], [message_text], [message_date]) VALUES (35, 5, 9, N'alo brate', CAST(N'2023-08-13T08:10:05.297' AS DateTime))
GO
INSERT [dbo].[message] ([message_id], [sender_id], [recipient_id], [message_text], [message_date]) VALUES (36, 5, 9, N'bratee', CAST(N'2023-08-13T09:53:12.747' AS DateTime))
GO
INSERT [dbo].[message] ([message_id], [sender_id], [recipient_id], [message_text], [message_date]) VALUES (37, 5, 9, N'Idemo najjace leto ikada matori', CAST(N'2023-08-13T16:56:27.280' AS DateTime))
GO
INSERT [dbo].[message] ([message_id], [sender_id], [recipient_id], [message_text], [message_date]) VALUES (1020, 9, 6, N'Bratic sta se desava?', CAST(N'2023-08-20T15:28:26.473' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[message] OFF
GO
SET IDENTITY_INSERT [dbo].[message_conversation] ON 
GO
INSERT [dbo].[message_conversation] ([conversation_id], [user1_id], [user2_id], [last_message_date]) VALUES (2, 9, 5, CAST(N'2023-08-13T16:56:27.280' AS DateTime))
GO
INSERT [dbo].[message_conversation] ([conversation_id], [user1_id], [user2_id], [last_message_date]) VALUES (3, 9, 6, CAST(N'2023-09-24T10:15:59.997' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[message_conversation] OFF
GO
SET IDENTITY_INSERT [dbo].[notification] ON 
GO
INSERT [dbo].[notification] ([notification_id], [user_id], [notification_text], [notification_date], [is_read]) VALUES (2, 4, N'You have a new follower: @bobi1', CAST(N'2023-07-22T22:05:04.023' AS DateTime), 0)
GO
INSERT [dbo].[notification] ([notification_id], [user_id], [notification_text], [notification_date], [is_read]) VALUES (4, 5, N'You have a new follower @testaraadmin!', CAST(N'2023-07-24T11:42:37.793' AS DateTime), 1)
GO
INSERT [dbo].[notification] ([notification_id], [user_id], [notification_text], [notification_date], [is_read]) VALUES (5, 6, N'You have a new follower @bobi1!', CAST(N'2023-07-29T10:36:56.477' AS DateTime), 1)
GO
INSERT [dbo].[notification] ([notification_id], [user_id], [notification_text], [notification_date], [is_read]) VALUES (6, 5, N'You have a new follower @testaraadmin!', CAST(N'2023-08-01T21:26:50.517' AS DateTime), 1)
GO
INSERT [dbo].[notification] ([notification_id], [user_id], [notification_text], [notification_date], [is_read]) VALUES (7, 6, N'You have a new follower @bobi1!', CAST(N'2023-08-03T11:42:33.323' AS DateTime), 1)
GO
INSERT [dbo].[notification] ([notification_id], [user_id], [notification_text], [notification_date], [is_read]) VALUES (8, 5, N'You have a new follower @test4!', CAST(N'2023-08-05T09:44:40.093' AS DateTime), 1)
GO
INSERT [dbo].[notification] ([notification_id], [user_id], [notification_text], [notification_date], [is_read]) VALUES (9, 6, N'You have a new follower @test4!', CAST(N'2023-08-07T20:47:45.583' AS DateTime), 1)
GO
INSERT [dbo].[notification] ([notification_id], [user_id], [notification_text], [notification_date], [is_read]) VALUES (10, 4, N'You have a new follower @test4!', CAST(N'2023-08-20T12:25:55.833' AS DateTime), 0)
GO
INSERT [dbo].[notification] ([notification_id], [user_id], [notification_text], [notification_date], [is_read]) VALUES (11, 8, N'You have a new follower @test4!', CAST(N'2023-08-20T14:44:11.080' AS DateTime), 0)
GO
INSERT [dbo].[notification] ([notification_id], [user_id], [notification_text], [notification_date], [is_read]) VALUES (12, 5, N'You have a new follower @miki.2!', CAST(N'2023-09-09T10:17:07.483' AS DateTime), 0)
GO
INSERT [dbo].[notification] ([notification_id], [user_id], [notification_text], [notification_date], [is_read]) VALUES (13, 6, N'You have a new follower @miki.2!', CAST(N'2023-09-09T10:17:47.843' AS DateTime), 1)
GO
INSERT [dbo].[notification] ([notification_id], [user_id], [notification_text], [notification_date], [is_read]) VALUES (14, 6, N'You have a new follower @Test1234111!', CAST(N'2024-04-13T15:02:38.663' AS DateTime), 0)
GO
INSERT [dbo].[notification] ([notification_id], [user_id], [notification_text], [notification_date], [is_read]) VALUES (15, 5, N'You have a new follower @Test1234111!', CAST(N'2024-04-13T15:03:26.190' AS DateTime), 0)
GO
SET IDENTITY_INSERT [dbo].[notification] OFF
GO
SET IDENTITY_INSERT [dbo].[post] ON 
GO
INSERT [dbo].[post] ([post_id], [user_id], [post_description], [post_date], [like_count], [comment_count]) VALUES (5, 5, N'These are my newest models

SIUUU. 🙌🙌🙌', CAST(N'2023-08-01T20:20:19.220' AS DateTime), 2, 2)
GO
INSERT [dbo].[post] ([post_id], [user_id], [post_description], [post_date], [like_count], [comment_count]) VALUES (6, 5, N'Another one

SIUUUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa tesdtiramo                               asdasdasdasd asdasd as dasdasdasd asd as das das das das das dasd as das dasd as das das d asd asd', CAST(N'2023-08-01T21:16:34.520' AS DateTime), 1, 1)
GO
SET IDENTITY_INSERT [dbo].[post] OFF
GO
SET IDENTITY_INSERT [dbo].[post_file] ON 
GO
INSERT [dbo].[post_file] ([post_file_id], [file_src], [file_type], [post_id]) VALUES (3, N'1690914019112.jpg', N'jpeg', 5)
GO
INSERT [dbo].[post_file] ([post_file_id], [file_src], [file_type], [post_id]) VALUES (4, N'1690914019169.jpg', N'jpeg', 5)
GO
INSERT [dbo].[post_file] ([post_file_id], [file_src], [file_type], [post_id]) VALUES (5, N'1690914019213.jpg', N'jpeg', 5)
GO
INSERT [dbo].[post_file] ([post_file_id], [file_src], [file_type], [post_id]) VALUES (6, N'1690917394509.jpg', N'jpeg', 6)
GO
SET IDENTITY_INSERT [dbo].[post_file] OFF
GO
SET IDENTITY_INSERT [dbo].[report] ON 
GO
INSERT [dbo].[report] ([report_id], [reporter_id], [reported_user_id], [report_date], [report_reason_id], [report_text]) VALUES (1, 5, 6, CAST(N'2023-07-28T14:56:07.150' AS DateTime), 4, NULL)
GO
SET IDENTITY_INSERT [dbo].[report] OFF
GO
SET IDENTITY_INSERT [dbo].[report_reason] ON 
GO
INSERT [dbo].[report_reason] ([report_reason_id], [reason], [detail]) VALUES (1, N'Harassment or Bullying', N'User is engaging in offensive or abusive behavior, targeting and harassing others.')
GO
INSERT [dbo].[report_reason] ([report_reason_id], [reason], [detail]) VALUES (2, N'Spam or Fake Account', N'User is posting irrelevant or repetitive content, or using a fake or misleading identity.')
GO
INSERT [dbo].[report_reason] ([report_reason_id], [reason], [detail]) VALUES (3, N'Inappropriate Content', N'User is sharing explicit, adult, or inappropriate material.')
GO
INSERT [dbo].[report_reason] ([report_reason_id], [reason], [detail]) VALUES (4, N'Violent or Threatening Behavior', N'User is promoting violence, making threats, or engaging in harmful behavior.')
GO
INSERT [dbo].[report_reason] ([report_reason_id], [reason], [detail]) VALUES (5, N'Hate Speech or Discrimination', N'User is spreading hate speech, discriminatory remarks, or engaging in prejudiced behavior.')
GO
INSERT [dbo].[report_reason] ([report_reason_id], [reason], [detail]) VALUES (6, N'Impersonation', N'User is pretending to be someone else, using their identity without permission.')
GO
INSERT [dbo].[report_reason] ([report_reason_id], [reason], [detail]) VALUES (7, N'Privacy Invasion', N'User is sharing private or sensitive information without consent.')
GO
INSERT [dbo].[report_reason] ([report_reason_id], [reason], [detail]) VALUES (8, N'Scam or Fraud', N'User is involved in fraudulent activities or attempting to deceive others for personal gain.')
GO
INSERT [dbo].[report_reason] ([report_reason_id], [reason], [detail]) VALUES (9, N'Violation of Terms of Service', N'User is breaching the platform''s terms of service or community guidelines.')
GO
INSERT [dbo].[report_reason] ([report_reason_id], [reason], [detail]) VALUES (10, N'Other', N'Any other reason not mentioned above, where the user''s behavior or actions are causing concern or violating platform rules.')
GO
SET IDENTITY_INSERT [dbo].[report_reason] OFF
GO
SET IDENTITY_INSERT [dbo].[role] ON 
GO
INSERT [dbo].[role] ([role_id], [name]) VALUES (1, N'admin                                             ')
GO
INSERT [dbo].[role] ([role_id], [name]) VALUES (2, N'user                                              ')
GO
SET IDENTITY_INSERT [dbo].[role] OFF
GO
SET IDENTITY_INSERT [dbo].[user] ON 
GO
INSERT [dbo].[user] ([user_id], [full_name], [username], [email], [password], [biography], [profile_picture_src], [register_date], [country_id], [role_id]) VALUES (4, N'Test Test', N'@test1234', N'test@test.com', N'$argon2id$v=19$m=65536,t=3,p=4$FAuv2YkScKI6tiTmGdG7Ng$XWCtcEbDxSTDMuOoNxsYgK2r0Oyd5Kp4eBj/2rx9bC0', NULL, N'anonymous.png', CAST(N'2023-07-18T13:32:52.253' AS DateTime), 115, 2)
GO
INSERT [dbo].[user] ([user_id], [full_name], [username], [email], [password], [biography], [profile_picture_src], [register_date], [country_id], [role_id]) VALUES (5, N'Obrad Obrad', N'@bobi1', N'bobi@gmail.com', N'$argon2id$v=19$m=65536,t=3,p=4$dsfDKMpLZSnwTyuniN4NFA$nCT9pVDJTsS3aeDApusGcCLtnkhKyA4gkzvxUkXSZuA', NULL, N'anonymous.png', CAST(N'2023-07-18T19:41:03.637' AS DateTime), 1, 2)
GO
INSERT [dbo].[user] ([user_id], [full_name], [username], [email], [password], [biography], [profile_picture_src], [register_date], [country_id], [role_id]) VALUES (6, N'Test Bane Admin', N'@testaraadmin', N'test1@test.com', N'$argon2id$v=19$m=65536,t=3,p=4$C5t+Ny8uta6848UYMX1y3A$1BYUSgI0AhQ14iCnoAfN+33vnhZRPY63iTTpQPAWd8I', NULL, N'1691089740133.jpg', CAST(N'2023-07-23T21:19:49.827' AS DateTime), 114, 2)
GO
INSERT [dbo].[user] ([user_id], [full_name], [username], [email], [password], [biography], [profile_picture_src], [register_date], [country_id], [role_id]) VALUES (7, N'Ponovni Test', N'@Test111', N'test2@gmail.com', N'$argon2id$v=19$m=65536,t=3,p=4$JP8oMTKMVCfKWt7TRKEVPQ$Z2EnnJhSi5L7P4UacNZeSyj+wdjh9zpJuMpZRU+yd2o', NULL, N'anonymous.png', CAST(N'2023-07-24T10:29:03.567' AS DateTime), 311, 2)
GO
INSERT [dbo].[user] ([user_id], [full_name], [username], [email], [password], [biography], [profile_picture_src], [register_date], [country_id], [role_id]) VALUES (8, N'Test Test', N'@test3', N'test3@gmail.com', N'$argon2id$v=19$m=65536,t=3,p=4$NNdamXoAaIQSB1y7e7tnvQ$Q0sfCPLpZUGWcYsE+baXlNx0xWGa2tX/cP7c/VsCR98', NULL, N'anonymous.png', CAST(N'2023-07-24T10:32:21.823' AS DateTime), 264, 2)
GO
INSERT [dbo].[user] ([user_id], [full_name], [username], [email], [password], [biography], [profile_picture_src], [register_date], [country_id], [role_id]) VALUES (9, N'Test Test', N'@test4', N'test4@test.com', N'$argon2id$v=19$m=65536,t=3,p=4$Y3kcm/vipg065Ek+H5LpXw$tbPFet/dw7hB7Lv6+GJVy84AbE8qEkNFooNP4+E9a80', NULL, N'anonymous.png', CAST(N'2023-07-24T10:34:05.240' AS DateTime), 125, 2)
GO
INSERT [dbo].[user] ([user_id], [full_name], [username], [email], [password], [biography], [profile_picture_src], [register_date], [country_id], [role_id]) VALUES (10, N'Test Test', N'@test5', N'test5@test.com', N'$argon2id$v=19$m=65536,t=3,p=4$LLR193cKyZEeXEkuJqO0lw$1syOcgXnNITKhEtmaBWdsWHWZX+eZQaGJNCelcFs9Ec', NULL, N'anonymous.png', CAST(N'2023-07-24T10:42:51.923' AS DateTime), 126, 2)
GO
INSERT [dbo].[user] ([user_id], [full_name], [username], [email], [password], [biography], [profile_picture_src], [register_date], [country_id], [role_id]) VALUES (11, N'Miki MIlane', N'@miki.2', N'miki@gmail.com', N'$argon2id$v=19$m=65536,t=3,p=4$3WUOuFlvRoFJm+avLJGQ2Q$yx0R6bNPMHF9EsCitRR/RaG0LxBC9xV+V72ABba36HM', NULL, N'anonymous.png', CAST(N'2023-09-09T10:17:00.787' AS DateTime), 115, 2)
GO
INSERT [dbo].[user] ([user_id], [full_name], [username], [email], [password], [biography], [profile_picture_src], [register_date], [country_id], [role_id]) VALUES (12, N'Testiram Test', N'@Test1234111', N'test.test@test.test', N'$argon2id$v=19$m=65536,t=3,p=4$Zxy+gVKL5borSqCCGiDNgA$j17xl+ia2rk5oOj92gD24O9zyo09NdoOmqq0+UVdPZc', NULL, N'anonymous.png', CAST(N'2024-04-13T15:02:12.023' AS DateTime), 308, 2)
GO
SET IDENTITY_INSERT [dbo].[user] OFF
GO
SET IDENTITY_INSERT [dbo].[user_follower] ON 
GO
INSERT [dbo].[user_follower] ([follower_id], [user_id], [follower_user_id], [follow_date]) VALUES (8, 5, 6, CAST(N'2023-08-01T21:26:50.517' AS DateTime))
GO
INSERT [dbo].[user_follower] ([follower_id], [user_id], [follower_user_id], [follow_date]) VALUES (9, 6, 5, CAST(N'2023-08-03T11:42:33.320' AS DateTime))
GO
INSERT [dbo].[user_follower] ([follower_id], [user_id], [follower_user_id], [follow_date]) VALUES (10, 5, 9, CAST(N'2023-08-05T09:44:40.090' AS DateTime))
GO
INSERT [dbo].[user_follower] ([follower_id], [user_id], [follower_user_id], [follow_date]) VALUES (11, 6, 9, CAST(N'2023-08-07T20:47:45.580' AS DateTime))
GO
INSERT [dbo].[user_follower] ([follower_id], [user_id], [follower_user_id], [follow_date]) VALUES (12, 4, 9, CAST(N'2023-08-20T12:25:55.823' AS DateTime))
GO
INSERT [dbo].[user_follower] ([follower_id], [user_id], [follower_user_id], [follow_date]) VALUES (13, 8, 9, CAST(N'2023-08-20T14:44:11.080' AS DateTime))
GO
INSERT [dbo].[user_follower] ([follower_id], [user_id], [follower_user_id], [follow_date]) VALUES (14, 5, 11, CAST(N'2023-09-09T10:17:07.480' AS DateTime))
GO
INSERT [dbo].[user_follower] ([follower_id], [user_id], [follower_user_id], [follow_date]) VALUES (15, 6, 11, CAST(N'2023-09-09T10:17:47.843' AS DateTime))
GO
INSERT [dbo].[user_follower] ([follower_id], [user_id], [follower_user_id], [follow_date]) VALUES (16, 6, 12, CAST(N'2024-04-13T15:02:38.653' AS DateTime))
GO
INSERT [dbo].[user_follower] ([follower_id], [user_id], [follower_user_id], [follow_date]) VALUES (17, 5, 12, CAST(N'2024-04-13T15:03:26.190' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[user_follower] OFF
GO
SET IDENTITY_INSERT [dbo].[user_login] ON 
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (1, 5, CAST(N'2023-07-22T18:39:39.233' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (2, 5, CAST(N'2023-07-22T18:41:40.150' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (3, 5, CAST(N'2023-07-22T18:44:08.863' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (4, 5, CAST(N'2023-07-22T18:46:26.783' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (5, 6, CAST(N'2023-07-23T21:24:43.173' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (6, 6, CAST(N'2023-07-24T10:28:11.147' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (7, 6, CAST(N'2023-07-24T11:00:12.767' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (8, 6, CAST(N'2023-07-24T11:04:07.727' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (9, 6, CAST(N'2023-07-24T11:32:01.320' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (10, 5, CAST(N'2023-07-24T11:48:20.707' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (11, 5, CAST(N'2023-07-29T11:37:58.957' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (12, 5, CAST(N'2023-07-30T11:18:25.450' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (13, 5, CAST(N'2023-07-30T11:52:32.923' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (14, 5, CAST(N'2023-07-30T13:06:23.617' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (15, 6, CAST(N'2023-08-01T21:26:29.510' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (16, 5, CAST(N'2023-08-03T10:57:01.470' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (17, 6, CAST(N'2023-08-03T10:57:24.167' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (18, 6, CAST(N'2023-08-03T10:59:11.557' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (19, 5, CAST(N'2023-08-03T10:59:29.870' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (20, 6, CAST(N'2023-08-03T11:03:08.153' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (21, 5, CAST(N'2023-08-03T11:40:40.847' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (22, 6, CAST(N'2023-08-03T11:42:48.117' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (23, 6, CAST(N'2023-08-03T11:50:02.407' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (24, 5, CAST(N'2023-08-03T11:50:17.893' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (25, 6, CAST(N'2023-08-03T11:50:32.530' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (26, 5, CAST(N'2023-08-03T12:08:17.270' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (27, 6, CAST(N'2023-08-03T18:58:43.367' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (28, 6, CAST(N'2023-08-04T17:00:08.713' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (29, 6, CAST(N'2023-08-04T17:01:34.570' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (30, 9, CAST(N'2023-08-05T09:43:51.980' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (31, 5, CAST(N'2023-08-08T18:57:29.327' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (32, 5, CAST(N'2023-08-08T23:02:31.590' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (33, 5, CAST(N'2023-08-08T23:15:56.503' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (34, 5, CAST(N'2023-08-09T18:55:04.277' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (35, 5, CAST(N'2023-08-12T17:14:15.337' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (36, 6, CAST(N'2023-08-12T18:14:27.340' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (37, 5, CAST(N'2023-08-12T18:16:58.250' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (38, 5, CAST(N'2023-08-13T08:09:18.080' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (39, 6, CAST(N'2023-08-13T16:42:26.440' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (1034, 5, CAST(N'2023-08-20T17:03:14.400' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (1035, 6, CAST(N'2023-08-20T17:03:36.870' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (1036, 6, CAST(N'2023-09-02T10:23:13.513' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (1037, 11, CAST(N'2023-09-09T10:17:43.017' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (1038, 5, CAST(N'2023-09-09T11:23:59.530' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (1039, 6, CAST(N'2023-09-09T19:23:49.173' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (1040, 9, CAST(N'2023-09-24T09:15:43.047' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (1041, 6, CAST(N'2023-09-24T09:40:55.870' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (1042, 6, CAST(N'2023-09-24T10:29:39.257' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (1043, 12, CAST(N'2024-06-23T22:06:41.077' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (1044, 5, CAST(N'2024-06-23T22:09:12.250' AS DateTime))
GO
INSERT [dbo].[user_login] ([login_id], [user_id], [login_date]) VALUES (1045, 9, CAST(N'2024-06-23T22:13:22.093' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[user_login] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [unique_country]    Script Date: 6/23/2024 10:24:01 PM ******/
ALTER TABLE [dbo].[country] ADD  CONSTRAINT [unique_country] UNIQUE NONCLUSTERED 
(
	[country_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [Unique file name]    Script Date: 6/23/2024 10:24:01 PM ******/
ALTER TABLE [dbo].[post_file] ADD  CONSTRAINT [Unique file name] UNIQUE NONCLUSTERED 
(
	[file_src] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [email]    Script Date: 6/23/2024 10:24:01 PM ******/
ALTER TABLE [dbo].[user] ADD  CONSTRAINT [email] UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[comment] ADD  CONSTRAINT [DF_comment_comment_date]  DEFAULT (getdate()) FOR [comment_date]
GO
ALTER TABLE [dbo].[comment_love] ADD  CONSTRAINT [DF_comment_love_comment_like_date]  DEFAULT (getdate()) FOR [comment_like_date]
GO
ALTER TABLE [dbo].[group] ADD  CONSTRAINT [DF_group_creation_date]  DEFAULT (getdate()) FOR [creation_date]
GO
ALTER TABLE [dbo].[group_member] ADD  CONSTRAINT [DF_group_member_join_date]  DEFAULT (getdate()) FOR [join_date]
GO
ALTER TABLE [dbo].[group_message] ADD  CONSTRAINT [DF_group_message_message_date]  DEFAULT (getdate()) FOR [message_date]
GO
ALTER TABLE [dbo].[love] ADD  CONSTRAINT [DF_love_like_date]  DEFAULT (getdate()) FOR [like_date]
GO
ALTER TABLE [dbo].[message] ADD  CONSTRAINT [DF_message_message_date]  DEFAULT (getdate()) FOR [message_date]
GO
ALTER TABLE [dbo].[post] ADD  CONSTRAINT [DF_post_post_date]  DEFAULT (getdate()) FOR [post_date]
GO
ALTER TABLE [dbo].[report] ADD  CONSTRAINT [DF_report_report_date]  DEFAULT (getdate()) FOR [report_date]
GO
ALTER TABLE [dbo].[user] ADD  CONSTRAINT [DF_user_register_date]  DEFAULT (getdate()) FOR [register_date]
GO
ALTER TABLE [dbo].[user_follower] ADD  CONSTRAINT [DF_user_follower_follow_date]  DEFAULT (getdate()) FOR [follow_date]
GO
ALTER TABLE [dbo].[user_login] ADD  CONSTRAINT [DF_user_login_login_date]  DEFAULT (getdate()) FOR [login_date]
GO
ALTER TABLE [dbo].[comment]  WITH CHECK ADD  CONSTRAINT [FK_comment_post] FOREIGN KEY([post_id])
REFERENCES [dbo].[post] ([post_id])
GO
ALTER TABLE [dbo].[comment] CHECK CONSTRAINT [FK_comment_post]
GO
ALTER TABLE [dbo].[comment]  WITH CHECK ADD  CONSTRAINT [FK_comment_user] FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([user_id])
GO
ALTER TABLE [dbo].[comment] CHECK CONSTRAINT [FK_comment_user]
GO
ALTER TABLE [dbo].[comment_love]  WITH CHECK ADD  CONSTRAINT [FK_comment_love_comment] FOREIGN KEY([comment_id])
REFERENCES [dbo].[comment] ([comment_id])
GO
ALTER TABLE [dbo].[comment_love] CHECK CONSTRAINT [FK_comment_love_comment]
GO
ALTER TABLE [dbo].[comment_love]  WITH CHECK ADD  CONSTRAINT [FK_comment_love_user] FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([user_id])
GO
ALTER TABLE [dbo].[comment_love] CHECK CONSTRAINT [FK_comment_love_user]
GO
ALTER TABLE [dbo].[continent_country]  WITH CHECK ADD  CONSTRAINT [FK_continent_country_id_continent] FOREIGN KEY([continent_id])
REFERENCES [dbo].[continent] ([continent_id])
GO
ALTER TABLE [dbo].[continent_country] CHECK CONSTRAINT [FK_continent_country_id_continent]
GO
ALTER TABLE [dbo].[continent_country]  WITH CHECK ADD  CONSTRAINT [FK_continent_country_id_country] FOREIGN KEY([country_id])
REFERENCES [dbo].[country] ([country_id])
GO
ALTER TABLE [dbo].[continent_country] CHECK CONSTRAINT [FK_continent_country_id_country]
GO
ALTER TABLE [dbo].[group_conversation]  WITH CHECK ADD  CONSTRAINT [FK_group_conversation_group] FOREIGN KEY([group_id])
REFERENCES [dbo].[group] ([group_id])
GO
ALTER TABLE [dbo].[group_conversation] CHECK CONSTRAINT [FK_group_conversation_group]
GO
ALTER TABLE [dbo].[group_member]  WITH CHECK ADD  CONSTRAINT [FK_group_member_group] FOREIGN KEY([group_id])
REFERENCES [dbo].[group] ([group_id])
GO
ALTER TABLE [dbo].[group_member] CHECK CONSTRAINT [FK_group_member_group]
GO
ALTER TABLE [dbo].[group_member]  WITH CHECK ADD  CONSTRAINT [FK_group_member_group_role] FOREIGN KEY([group_role_id])
REFERENCES [dbo].[group_role] ([group_role_id])
GO
ALTER TABLE [dbo].[group_member] CHECK CONSTRAINT [FK_group_member_group_role]
GO
ALTER TABLE [dbo].[group_member]  WITH CHECK ADD  CONSTRAINT [FK_group_member_user] FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([user_id])
GO
ALTER TABLE [dbo].[group_member] CHECK CONSTRAINT [FK_group_member_user]
GO
ALTER TABLE [dbo].[group_message]  WITH CHECK ADD  CONSTRAINT [FK_Table_1_Table_1_group] FOREIGN KEY([group_id])
REFERENCES [dbo].[group] ([group_id])
GO
ALTER TABLE [dbo].[group_message] CHECK CONSTRAINT [FK_Table_1_Table_1_group]
GO
ALTER TABLE [dbo].[group_message]  WITH CHECK ADD  CONSTRAINT [FK_Table_1_Table_1_sender] FOREIGN KEY([sender_id])
REFERENCES [dbo].[user] ([user_id])
GO
ALTER TABLE [dbo].[group_message] CHECK CONSTRAINT [FK_Table_1_Table_1_sender]
GO
ALTER TABLE [dbo].[love]  WITH CHECK ADD  CONSTRAINT [FK_love_post] FOREIGN KEY([post_id])
REFERENCES [dbo].[post] ([post_id])
GO
ALTER TABLE [dbo].[love] CHECK CONSTRAINT [FK_love_post]
GO
ALTER TABLE [dbo].[love]  WITH CHECK ADD  CONSTRAINT [FK_love_user] FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([user_id])
GO
ALTER TABLE [dbo].[love] CHECK CONSTRAINT [FK_love_user]
GO
ALTER TABLE [dbo].[message]  WITH CHECK ADD  CONSTRAINT [FK_message_user] FOREIGN KEY([sender_id])
REFERENCES [dbo].[user] ([user_id])
GO
ALTER TABLE [dbo].[message] CHECK CONSTRAINT [FK_message_user]
GO
ALTER TABLE [dbo].[message]  WITH CHECK ADD  CONSTRAINT [FK_message_user1-recipient] FOREIGN KEY([recipient_id])
REFERENCES [dbo].[user] ([user_id])
GO
ALTER TABLE [dbo].[message] CHECK CONSTRAINT [FK_message_user1-recipient]
GO
ALTER TABLE [dbo].[message_conversation]  WITH CHECK ADD  CONSTRAINT [FK_message_conversation_user] FOREIGN KEY([user1_id])
REFERENCES [dbo].[user] ([user_id])
GO
ALTER TABLE [dbo].[message_conversation] CHECK CONSTRAINT [FK_message_conversation_user]
GO
ALTER TABLE [dbo].[message_conversation]  WITH CHECK ADD  CONSTRAINT [FK_message_conversation_user1] FOREIGN KEY([user2_id])
REFERENCES [dbo].[user] ([user_id])
GO
ALTER TABLE [dbo].[message_conversation] CHECK CONSTRAINT [FK_message_conversation_user1]
GO
ALTER TABLE [dbo].[notification]  WITH CHECK ADD  CONSTRAINT [FK_notification_user] FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([user_id])
GO
ALTER TABLE [dbo].[notification] CHECK CONSTRAINT [FK_notification_user]
GO
ALTER TABLE [dbo].[post]  WITH CHECK ADD  CONSTRAINT [FK_post_user] FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([user_id])
GO
ALTER TABLE [dbo].[post] CHECK CONSTRAINT [FK_post_user]
GO
ALTER TABLE [dbo].[post_file]  WITH CHECK ADD  CONSTRAINT [FK_post_file_post] FOREIGN KEY([post_id])
REFERENCES [dbo].[post] ([post_id])
GO
ALTER TABLE [dbo].[post_file] CHECK CONSTRAINT [FK_post_file_post]
GO
ALTER TABLE [dbo].[report]  WITH CHECK ADD  CONSTRAINT [FK_Table_1_Table_1_report_reason] FOREIGN KEY([report_reason_id])
REFERENCES [dbo].[report_reason] ([report_reason_id])
GO
ALTER TABLE [dbo].[report] CHECK CONSTRAINT [FK_Table_1_Table_1_report_reason]
GO
ALTER TABLE [dbo].[report]  WITH CHECK ADD  CONSTRAINT [reported_user] FOREIGN KEY([reported_user_id])
REFERENCES [dbo].[user] ([user_id])
GO
ALTER TABLE [dbo].[report] CHECK CONSTRAINT [reported_user]
GO
ALTER TABLE [dbo].[report]  WITH CHECK ADD  CONSTRAINT [reporter] FOREIGN KEY([reporter_id])
REFERENCES [dbo].[user] ([user_id])
GO
ALTER TABLE [dbo].[report] CHECK CONSTRAINT [reporter]
GO
ALTER TABLE [dbo].[user]  WITH CHECK ADD  CONSTRAINT [FK_user_role] FOREIGN KEY([role_id])
REFERENCES [dbo].[role] ([role_id])
GO
ALTER TABLE [dbo].[user] CHECK CONSTRAINT [FK_user_role]
GO
ALTER TABLE [dbo].[user]  WITH CHECK ADD  CONSTRAINT [user_country] FOREIGN KEY([country_id])
REFERENCES [dbo].[country] ([country_id])
GO
ALTER TABLE [dbo].[user] CHECK CONSTRAINT [user_country]
GO
ALTER TABLE [dbo].[user_follower]  WITH CHECK ADD  CONSTRAINT [FK_Table_1_Table_1_user_that_follows] FOREIGN KEY([follower_user_id])
REFERENCES [dbo].[user] ([user_id])
GO
ALTER TABLE [dbo].[user_follower] CHECK CONSTRAINT [FK_Table_1_Table_1_user_that_follows]
GO
ALTER TABLE [dbo].[user_follower]  WITH CHECK ADD  CONSTRAINT [FK_Table_1_Table_user_being_followed] FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([user_id])
GO
ALTER TABLE [dbo].[user_follower] CHECK CONSTRAINT [FK_Table_1_Table_user_being_followed]
GO
ALTER TABLE [dbo].[user_login]  WITH CHECK ADD  CONSTRAINT [FK_user_login_user] FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([user_id])
GO
ALTER TABLE [dbo].[user_login] CHECK CONSTRAINT [FK_user_login_user]
GO
/****** Object:  Trigger [dbo].[tr_UpdatePostCommentsCount]    Script Date: 6/23/2024 10:24:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER [dbo].[tr_UpdatePostCommentsCount]
ON [dbo].[comment]
AFTER INSERT, DELETE
AS
BEGIN
    -- Get the post_id for the affected comment
    DECLARE @AffectedPostID INT;
    SELECT @AffectedPostID = post_id
    FROM inserted;

    -- Update the comments count in the post table
    UPDATE post
    SET comment_count = (
        SELECT COUNT(*)
        FROM comment
        WHERE post_id = @AffectedPostID
    )
    WHERE post_id = @AffectedPostID;
END;


GO
ALTER TABLE [dbo].[comment] ENABLE TRIGGER [tr_UpdatePostCommentsCount]
GO
/****** Object:  Trigger [dbo].[tr_UpdateCommentLikesCount]    Script Date: 6/23/2024 10:24:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER  [dbo].[tr_UpdateCommentLikesCount]
   ON  [dbo].[comment_love]
   AFTER INSERT, DELETE
AS 
BEGIN
	UPDATE comment
    SET like_count = (
        SELECT COUNT(*)
        FROM comment_love
        WHERE comment_id = comment.comment_id
    )
    WHERE comment_id IN (SELECT DISTINCT comment_id FROM deleted UNION SELECT DISTINCT comment_id FROM inserted);

END
GO
ALTER TABLE [dbo].[comment_love] ENABLE TRIGGER [tr_UpdateCommentLikesCount]
GO
/****** Object:  Trigger [dbo].[tr_InsertGroupMessageAndUpdateConversation]    Script Date: 6/23/2024 10:24:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER [dbo].[tr_InsertGroupMessageAndUpdateConversation]
ON [dbo].[group_message]
AFTER INSERT
AS
BEGIN
    -- Get the inserted message_id and message_date
    DECLARE @InsertedMessageID INT, @InsertedMessageDate DATETIME;
    SELECT @InsertedMessageID = message_id, @InsertedMessageDate = message_date
    FROM inserted;

    -- Get the sender_id and group_id for the inserted message
    DECLARE @SenderID INT, @GroupID INT;
    SELECT @SenderID = sender_id, @GroupID = group_id
    FROM inserted;

    -- Check if a conversation exists for the group
    DECLARE @ConversationID INT;
    SELECT @ConversationID = conversation_id
    FROM group_conversation
    WHERE group_id = @GroupID;

    -- Exclude the rows inserted within the trigger using LEFT JOIN
    IF NOT EXISTS (
        SELECT inserted.message_id
        FROM inserted
        LEFT JOIN (
            SELECT @InsertedMessageID AS message_id, @InsertedMessageDate AS message_date, @SenderID AS sender_id, @GroupID AS group_id
        ) AS trigger_inserted
        ON inserted.message_id = trigger_inserted.message_id
            AND inserted.message_date = trigger_inserted.message_date
            AND inserted.sender_id = trigger_inserted.sender_id
            AND inserted.group_id = trigger_inserted.group_id
        WHERE trigger_inserted.message_id IS NULL
    )
    BEGIN
        IF @ConversationID IS NULL
        BEGIN
            -- Create a new conversation for the group
            INSERT INTO group_conversation (group_id, last_message_date)
            VALUES (@GroupID, @InsertedMessageDate);
        END
        ELSE
        BEGIN
            -- Update the last message date in the existing group conversation
            UPDATE group_conversation
            SET last_message_date = @InsertedMessageDate
            WHERE conversation_id = @ConversationID;
        END;
    END;
END;

GO
ALTER TABLE [dbo].[group_message] ENABLE TRIGGER [tr_InsertGroupMessageAndUpdateConversation]
GO
/****** Object:  Trigger [dbo].[tr_UpdatePostLikesCount]    Script Date: 6/23/2024 10:24:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER [dbo].[tr_UpdatePostLikesCount]
ON [dbo].[love]
AFTER INSERT, DELETE
AS
BEGIN
	UPDATE post
    SET like_count = (
        SELECT COUNT(*)
        FROM love
        WHERE post_id = post.post_id
    )
    WHERE post_id IN (SELECT DISTINCT post_id FROM deleted UNION SELECT DISTINCT post_id FROM inserted);
END;

GO
ALTER TABLE [dbo].[love] ENABLE TRIGGER [tr_UpdatePostLikesCount]
GO
/****** Object:  Trigger [dbo].[tr_InsertMessageAndUpdateConversation]    Script Date: 6/23/2024 10:24:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER [dbo].[tr_InsertMessageAndUpdateConversation]
ON [dbo].[message]
AFTER INSERT
AS
BEGIN
    -- Get the inserted message_id and message_date
    DECLARE @InsertedMessageID INT, @InsertedMessageDate DATETIME;
    SELECT @InsertedMessageID = message_id, @InsertedMessageDate = message_date
    FROM inserted;

    -- Get the sender_id and recipient_id for the inserted message
    DECLARE @SenderID INT, @RecipientID INT;
    SELECT @SenderID = sender_id, @RecipientID = recipient_id
    FROM inserted;

    -- Check if a conversation exists between the sender and recipient
    DECLARE @ConversationID INT;
    SELECT @ConversationID = conversation_id
    FROM message_conversation
    WHERE (user1_id = @SenderID AND user2_id = @RecipientID)
        OR (user1_id = @RecipientID AND user2_id = @SenderID);

    -- Exclude the rows inserted within the trigger using LEFT JOIN
    IF NOT EXISTS (
        SELECT inserted.message_id
        FROM inserted
        LEFT JOIN (
            SELECT @InsertedMessageID AS message_id, @InsertedMessageDate AS message_date, @SenderID AS sender_id, @RecipientID AS recipient_id
        ) AS trigger_inserted
        ON inserted.message_id = trigger_inserted.message_id
            AND inserted.message_date = trigger_inserted.message_date
            AND inserted.sender_id = trigger_inserted.sender_id
            AND inserted.recipient_id = trigger_inserted.recipient_id
        WHERE trigger_inserted.message_id IS NULL
    )
    BEGIN
        IF @ConversationID IS NULL
        BEGIN
            -- Create a new conversation
            INSERT INTO message_conversation (user1_id, user2_id, last_message_date)
            VALUES (@SenderID, @RecipientID, @InsertedMessageDate);
        END
        ELSE
        BEGIN
            -- Update the last message date in the existing conversation
            UPDATE message_conversation
            SET last_message_date = @InsertedMessageDate
            WHERE conversation_id = @ConversationID;
        END;
    END;
END;

GO
ALTER TABLE [dbo].[message] ENABLE TRIGGER [tr_InsertMessageAndUpdateConversation]
GO
/****** Object:  Trigger [dbo].[tr_InsertUserFollowerSendNotification]    Script Date: 6/23/2024 10:24:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER [dbo].[tr_InsertUserFollowerSendNotification]
ON [dbo].[user_follower]
AFTER INSERT
AS
BEGIN
    DECLARE @userId INT, @followerUserId INT, @notificationText NVARCHAR(255), @username NVARCHAR(255);

    -- Get the inserted follow details
    SELECT @userId = user_id, @followerUserId = follower_user_id
    FROM inserted;

    -- Get the username of the follower
    SELECT @username = username
    FROM [user]
    WHERE user_id = @followerUserId;

    -- Generate notification text
    SET @notificationText = 'You have a new follower ' + @username + '!';

    -- Insert notification for the user being followed
    INSERT INTO notification (user_id, notification_text, notification_date, is_read)
    VALUES (@userId, @notificationText, GETDATE(), 0);

END;

GO
ALTER TABLE [dbo].[user_follower] ENABLE TRIGGER [tr_InsertUserFollowerSendNotification]
GO
