# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy csproj and restore as distinct layers
COPY ["ProtelApi.csproj", "./"]
RUN dotnet restore "ProtelApi.csproj"

# Copy everything else and build
COPY . .
RUN dotnet publish "ProtelApi.csproj" -c Release -o /app/publish

# Serve Stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .

# Expose port (Railway sets PORT env var, but we verify here)
EXPOSE 8080

ENTRYPOINT ["dotnet", "ProtelApi.dll"]
