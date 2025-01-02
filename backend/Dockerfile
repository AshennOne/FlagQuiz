# Base image for runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Base image for build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["FlagsQuizApi.csproj", "./"]
RUN dotnet restore "FlagsQuizApi.csproj"
COPY . .
RUN dotnet build "FlagsQuizApi.csproj" -c Release -o /app/build

# Publish the app
FROM build AS publish
RUN dotnet publish "FlagsQuizApi.csproj" -c Release -o /app/publish

# Final stage: runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FlagsQuizApi.dll"]
